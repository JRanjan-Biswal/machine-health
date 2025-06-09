const RecentActivity = ({
  lastService = "NIL",
  nextVisitDate = "10/12/2026",
  nextVisitType = "Process Audit",
  openRequests = "[None]"
}) => {
  return (
    <div className="w-[303px] p-[25px] bg-white rounded-md border-2 border-[#96a5ba] flex flex-col gap-[15px]">
      <div className="text-[#2d3e5c] text-[18px] leading-[24px] font-lato">
        <span className="font-semibold">Last Service:</span> {lastService}
      </div>
      <div className="text-[#d45815] text-[18px] leading-[24px] font-lato">
        <span className="font-semibold">Next Visit:</span> [{nextVisitDate}, {nextVisitType}]
      </div>
      <div className="text-[#2d3e5c] text-[18px] leading-[24px] font-lato">
        <span className="font-semibold">Open Requests:</span> {openRequests}
      </div>
    </div>
  );
};

export default RecentActivity;