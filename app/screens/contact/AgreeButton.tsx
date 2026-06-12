const AgreeButton = () => {
  return (
    <div className="text-stone-400 mt-10 space-y-4 font-thin">
      <div className="text-xl text-white ">개인정보 수집 동의</div>
      <div className="space-y-1">
        <div>수집 항목: 필수 (성명,연락처 등) /선택 (첨부파일 등)</div>
        <div>
          수집된 정보는 문의 접수 및 회신에 이용되며 '전자상거래',"정보통신망
          이용촉진 및 정보보호" 등 관련 법령에 따라 6개월간 보관됩니다.
        </div>
        <div>
          이용자는 본 동의를 거부할 수 있으며, 미동의 시 문의 접수가 불가합니다.
        </div>
      </div>
      <div className="flex gap-2 ">
        <input
          type="checkbox"
          className="w-4 accent-blue-700"
          id="box"
          // required
        />
        <label className="text-lg" htmlFor="box">
          위 사항을 이해했으며 동의합니다 *
        </label>
      </div>
    </div>
  );
};

export default AgreeButton;
