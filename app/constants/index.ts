const PROCESS_STEPS = [
  {
    title: "01",
    text: "프로젝트 의뢰",
    description:
      " 고객의 요구사항을 파악하고, 프로젝트의 목표와 범위를 정의합니다.",
  },
  {
    title: "02",
    text: "기획 및 디자인",
    description: "프로젝트 목적과 환경에 맞는 소재와 제작 방식을 제안합니다.",
  },
  {
    title: "03",
    text: "제작",
    description:
      "시장의 변화와 트렌드를 빠르게 반영하여 아이디어를 실현합니다.",
  },
  {
    title: "04",
    text: "운송 및 설치",
    description: "현실 조건을 고려해 가장 안전하고 튼튼하게 설치합니다.",
  },
];

const OPTIONS = {
  COST: [
    { value: "100만원이하", label: "100만원이하" },
    { value: "300만원이하", label: "100만원~300만원" },
    { value: "500만원이하", label: "300만원~500만원" },
    { value: "1000만원이하", label: "500만원~1000만원" },
    { value: "2000만원이하", label: "1000만원~2000만원" },
    { value: "5000만원이하", label: "2000만원~5000만원" },
    { value: "1억원이하", label: "5000만원~1억원" },
    { value: "1억원이상", label: "1억원이상" },
    { value: "알수없음", label: "알수없음" },
  ],
  DESIGN: [
    { value: "2D디자인(사진포함)", label: "2D디자인(사진포함)" },
    { value: "3D디자인", label: "3D디자인" },
    { value: "도면", label: "도면" },
    { value: "아니오", label: "아니오" },
  ],
  SCHEDULE: [
    { value: "1개월내", label: "시급해요!(1개월내)" },
    { value: "3개월내", label: "1개월~3개월" },
    { value: "3개월이상", label: "3개월이상" },
    { value: "알수없음", label: "알수없음" },
  ],
  PLATFORM: [
    { value: "블로그", label: "블로그" },
    { value: "홈페이지", label: "홈페이지" },
    { value: "인스타그램", label: "인스타그램" },
    { value: "페이스북", label: "페이스북" },
    { value: "유튜브", label: "유튜브" },
    { value: "기존고객", label: "기존고객" },
    { value: "소개", label: "소개" },
    { value: "크몽", label: "크몽" },
    { value: "기타", label: "기타" },
    { value: "알수없음", label: "알수없음" },
  ],
};

export { PROCESS_STEPS, OPTIONS };
