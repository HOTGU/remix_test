import type { ActionFunctionArgs } from "react-router";

import Container from "~/components/global/Container";
import PaddingSection from "~/components/global/PaddingSection";
import ContactForm from "~/screens/contact/ContactForm";

import { getDb } from "~/libs/db.server";
import { uploadFileToS3 } from "~/libs/s3.server";
import { ClientSchema } from "~/schemas/client.server";
import { ContactSchema, type Contact } from "~/schemas/contact.server";
import type { Route } from "./+types/contact";

// 1. Contact 전용 SEO Meta 함수
export function meta({ location }: Route.MetaArgs) {
  const domain = "https://weavement.co.kr"; // 실제 도메인으로 변경하세요
  const title = "조형물 제작 문의 - 위브먼트";
  const description =
    "FRP 조형물, 캐릭터 모형, 인형탈, 에어 조형물 제작 문의. 아이디어와 예산에 맞춘 최적의 조형물 제작 솔루션을 안내해 드립니다.";

  return [
    { title },
    { name: "description", content: description },
    {
      name: "keywords",
      content:
        "조형물 제작 문의, FRP 조형물 견적, 캐릭터 조형물 제작 단가, 인형탈 제작, 에어 조형물 문의, 위브먼트",
    },
    {
      tagName: "link",
      rel: "canonical",
      href: `${domain}${location.pathname}`,
    },

    // Open Graph
    { property: "og:type", content: "website" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: `${domain}${location.pathname}` },
    { property: "og:locale", content: "ko_KR" },
  ];
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    const files = formData
      .getAll("images")
      .filter((f): f is File => f instanceof File && f.size > 0);

    const imageUrls = await Promise.all(
      files.map((file) =>
        uploadFileToS3({
          folderName: String(formData.get("clientCompany")) || "unknown",
          file,
          resizeWidth: 1600,
        }),
      ),
    );

    const clientResult = ClientSchema.safeParse({
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      position: formData.get("position") || "",
    });

    if (!clientResult.success) {
      return Response.json(
        {
          ok: false,
          fieldErrors: clientResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const contactResult = ContactSchema.safeParse({
      hasDesign: formData.get("hasDesign"),
      cost: formData.get("cost"),
      schedule: formData.get("schedule"),
      description: formData.get("description"),
      images: imageUrls,
      knowPlatform: formData.get("knowPlatform"),
      clientCompany: formData.get("clientCompany"),
      clients: [clientResult.data],
    });

    if (!contactResult.success) {
      return Response.json(
        {
          ok: false,
          fieldErrors: contactResult.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const db = await getDb();
    await db.collection("Contact").insertOne(contactResult.data);

    return Response.json({
      ok: true,
      message: `문의가 성공적으로 접수되었습니다\n빠른 시일내에 연락드리겠습니다`,
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        ok: false,
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 },
    );
  }
}

export default function Contact() {
  // 2. 문의하기 전용 구조화 데이터 (JSON-LD)
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "위브먼트 조형물 제작 문의",
    description: "FRP, 캐릭터, 인형탈, 에어 조형물 제작 견적 및 상담 요청",
    url: "https://weavement.co.kr/contact",
  };

  return (
    <main className="bg-black min-h-screen text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <PaddingSection size="lg" />
      <Container>
        <section className="flex justify-between">
          <header className="space-y-10 w-[33%]">
            {/* 3. SEO 및 크롤러용 스크린리더 타이틀 */}
            <h1 className="sr-only">
              위브먼트 맞춤형 조형물 제작 프로젝트 문의 및 견적 요청
            </h1>

            {/* 시각적 헤딩 디자인 */}
            <div className="text-6xl" aria-hidden="true">
              함께 이야기해요
            </div>
            <p className="text-2xl whitespace-pre-wrap break-keep font-extralight">
              어떤 걸 만들고 싶으신지, 그리고 저희가 어떻게 도움 드리면 좋을지
              들려주세요.
            </p>
          </header>

          <div className="w-1/2">
            <h2 className="sr-only">조형물 제작 문의 양식 작성</h2>
            <ContactForm />
          </div>
        </section>
      </Container>
    </main>
  );
}
