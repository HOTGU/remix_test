import { type ActionFunctionArgs } from "react-router";

import Container from "~/components/global/Container";
import PaddingSection from "~/components/global/PaddingSection";
import ContactForm from "~/screens/contact/ContactForm";

import { getDb } from "~/libs/db.server";
import { uploadFileToS3 } from "~/libs/s3.server";
import { ClientSchema } from "~/schemas/client.server";
import { ContactSchema, type Contact } from "~/schemas/contact.server";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();

    //
    // files
    //

    const files = formData
      .getAll("images")
      .filter((f): f is File => f instanceof File && f.size > 0);

    //
    // upload
    //

    const imageUrls = await Promise.all(
      files.map((file) =>
        uploadFileToS3({
          folderName: String(formData.get("clientCompany")) || "unknown",

          file,

          resizeWidth: 1600,
        }),
      ),
    );

    //
    // client
    //

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
        {
          status: 400,
        },
      );
    }

    //
    // contact
    //

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
        {
          status: 400,
        },
      );
    }

    //
    // db
    //

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
      {
        status: 500,
      },
    );
  }
}

export default function Contact() {
  return (
    <div className="bg-black min-h-screen text-slate-200">
      <PaddingSection size="lg" />
      <Container>
        <div className="flex justify-between">
          <div className=" space-y-10 w-[33%]">
            <div className="text-6xl">함께 이야기해요</div>
            <div className="text-2xl whitespace-pre-wrap break-keep font-extralight">
              어떤 걸 만들고 싶으신지, 그리고 저희가 어떻게 도움 드리면 좋을지
              들려주세요.
            </div>
          </div>

          <div className="w-1/2">
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
