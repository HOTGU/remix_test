import { Form, useActionData, useNavigation } from "react-router";
import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";

import Container from "~/components/global/Container";
import FileInput from "~/components/global/FileInput";
import Input from "~/components/global/Input";
import PaddingSection from "~/components/global/PaddingSection";
import Radio from "~/components/global/Radio";
import Select from "~/components/global/Select";
import Textarea from "~/components/global/Textarea";
import { OPTIONS } from "~/constants";

const FormColumnTitle = ({ children }: { children: React.ReactNode }) => (
  <div className=" font-ibm text-3xl font-light mb-4">{children}</div>
);

export default function Contact() {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

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
            <Form>
              <FormColumnTitle>프로젝트 정보</FormColumnTitle>

              <Textarea
                name="description"
                label="어떤 걸 만들고 싶으신가요? *"
                // required
              />
              <Select
                name="cost"
                options={OPTIONS.COST}
                label="예산을 선택해주세요 *"
                // required
              />
              <Radio
                options={OPTIONS.DESIGN}
                name="hasDesign"
                label="디자인을 가지고 계신가요 *"
                // required
              />
              <Radio
                options={OPTIONS.SCHEDULE}
                name="schedule"
                label="일정을 선택해주세요 *"
                // required
              />
              <FileInput label="참고사진 (최대5개)" name="images" />

              <PaddingSection size="sm" />

              <FormColumnTitle>고객 정보</FormColumnTitle>
              <Input name="clientCompany" label="회사명" />
              <Input
                name="name"
                label="성함 *"
                // required
              />
              <Input name="position" label="직급" />
              <Input name="phone" label="번호 *" />
              <Input name="email" label="이메일 *" />

              <PaddingSection size="sm" />

              <FormColumnTitle>부가정보</FormColumnTitle>
              <Select
                name="knowPlatform"
                options={OPTIONS.PLATFORM}
                label="알게 된 경로를 선택해주세요 *"
                // required
              />

              <PaddingSection size="sm" />

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  "전송 중"
                ) : (
                  <ReverseUnderlineText label="제출하기" color="white" />
                )}
              </button>

              <PaddingSection size="lg" />
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}
