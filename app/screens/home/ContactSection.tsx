import { Link } from "react-router";

import ReverseUnderlineText from "~/components/framer/ReverseUnderlineText";

const ContactSection = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-20 text-neutral-900 bg-amber-200 h-screen">
      <div className="text-6xl">어떤 아이디어를 실현해 드릴까요?</div>
      <Link to="/contact">
        <ReverseUnderlineText size="lg" color="black" label="문의하기" />
      </Link>
    </div>
  );
};

export default ContactSection;
