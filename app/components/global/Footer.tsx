import { Link } from "react-router";
import { Mail, Phone, PhoneCall } from "lucide-react";

import Container from "./Container";

const Footer = () => {
  return (
    <div>
      <Container>
        <div className=" flex py-32">
          <div className="w-2/3">
            <Link
              to="/"
              className="text-neutral-600 hover:text-white hover:cursor-pointer transition font-racing text-9xl"
            >
              WEAVEMENT
            </Link>
          </div>
          <div className="w-1/3 text-neutral-400 font-extralight my-4">
            <div className=" grid grid-cols-3 space-y-2 text-lg">
              <div>About</div>
              <div>F&A</div>
              <div>Blog</div>
              <div>Column</div>
              <div>Instagram</div>
              <div>Portfolio</div>
            </div>
            <div className="text-neutral-600 pt-10 space-y-1 py-10">
              <div className="flex items-center gap-2">
                <Mail size={14} />
                <span>contact@weavement.co.kr</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} />
                <span>010-2770-7181</span>
              </div>
              <div>영업시간 10:00 ~ 18:00 (주말,공휴일 휴무)</div>
              <div>
                경기도 고양시 덕양구 향동로 201 GL메트로시티향동, A1410호
              </div>
              <div>사업자등록번호 313-47-00901</div>
            </div>
            <div className=" text-neutral-600 font-bold">
              &#169; 2026 WEAVEMENT. All rights reserved.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
