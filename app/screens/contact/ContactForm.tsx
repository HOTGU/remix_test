import { Form, useActionData, useNavigation } from "react-router";

import FormColumnTitle from "./FormColumnTitle";
import Textarea from "~/components/global/Textarea";
import Select from "~/components/global/Select";
import Radio from "~/components/global/Radio";
import FileInput from "~/components/global/FileInput";
import PaddingSection from "~/components/global/PaddingSection";
import Input from "~/components/global/Input";
import AgreeButton from "./AgreeButton";
import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";

import { OPTIONS } from "~/constants";
import LoopUnderlineText from "~/components/framer/LoopUnderlineText";
import FieldError from "~/components/global/FieldError";
import { useEffect } from "react";
import { toast } from "sonner";

const ContactForm = () => {
  const actionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (!actionData) return;
    if (actionData.ok) {
      toast.success(actionData.message);
    }
    if (!actionData.ok && actionData.message) {
      toast.error(actionData.message);
    }
  }, [actionData]);

  return (
    <Form method="POST" encType="multipart/form-data">
      <FormColumnTitle>프로젝트 정보</FormColumnTitle>

      <Textarea
        name="description"
        label="규격, 납기일, 컨텐츠, 소재 등 상세히 기입해주세요 *"
        error={actionData?.fieldErrors?.description?.[0]}
        //     required
      />
      <FieldError />
      <Select
        name="cost"
        options={OPTIONS.COST}
        label="예산을 선택해주세요 *"
        error={actionData?.fieldErrors?.cost?.[0]}
        //   required
      />
      <Radio
        options={OPTIONS.DESIGN}
        name="hasDesign"
        label="디자인을 가지고 계신가요 *"
        error={actionData?.fieldErrors?.hasDesign?.[0]}
        //   required
      />
      <Radio
        options={OPTIONS.SCHEDULE}
        name="schedule"
        label="일정을 선택해주세요 *"
        error={actionData?.fieldErrors?.schedule?.[0]}
        //   required
      />
      <FileInput label="참고사진 (최대5개)" name="images" />

      <PaddingSection size="sm" />

      <FormColumnTitle>고객 정보</FormColumnTitle>
      <Input
        name="clientCompany"
        label="회사명 *"
        error={actionData?.fieldErrors?.clientCompany?.[0]}
        //   required
      />
      <Input
        name="name"
        label="성함 *"
        error={actionData?.fieldErrors?.name?.[0]}
        //   required
      />
      <Input name="position" label="직급" />
      <Input
        name="phone"
        label="번호 *"
        error={actionData?.fieldErrors?.phone?.[0]}
        //   required
      />
      <Input
        name="email"
        label="이메일 *"
        error={actionData?.fieldErrors?.email?.[0]}
        //   required
      />

      <PaddingSection size="sm" />

      <FormColumnTitle>부가정보</FormColumnTitle>
      <Select
        name="knowPlatform"
        options={OPTIONS.PLATFORM}
        label="알게 된 경로를 선택해주세요 *"
        error={actionData?.fieldErrors?.knowPlatform?.[0]}
        //   required
      />

      <AgreeButton />

      <PaddingSection size="sm" />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <LoopUnderlineText label="제출중.." color="white" />
        ) : (
          <ReverseUnderlineText label="제출하기" color="white" />
        )}
      </button>

      <PaddingSection size="lg" />
    </Form>
  );
};

export default ContactForm;
