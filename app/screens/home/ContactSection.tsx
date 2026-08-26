import { Link } from "react-router";

import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";

const ContactSection = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-20 text-neutral-900 bg-amber-200 h-screen">
      <div className="text-6xl">우리가 어떻게 도와드릴까요?</div>
      <Link to="/contact">
        <ReverseUnderlineText size="lg" color="black" label="문의하러 가기" />
      </Link>
    </div>
  );
};

export default ContactSection;
