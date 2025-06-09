const RecentActivity = ({
  lastService = "NIL",
  nextVisitDate = "10/12/2026",
  nextVisitType = "Process Audit",
  openRequests = "[None]"
}) => {
  return (
    <div className="w-[303px] p-[25px] bg-white rounded-md border-2 border-[#96a5ba] flex flex-col gap-[15px]">
      <div className="text-[#2d3e5c] leading-[24px] font-lato">
        <span className="font-semibold font-lato text-base">Last Service:</span><span className="tex-[14px]">{" "}{lastService}</span>
      </div>
      <div className="text-[#d45815] leading-[24px] font-lato">
        <span className="font-semibold font-lato text-base">Next Visit:</span><span className="tex-[14px]">{" "}[{nextVisitDate}, {nextVisitType}]</span>
      </div>
      <div className="text-[#2d3e5c] leading-[24px] font-lato">
        <span className="font-semibold font-lato text-base">Open Requests:</span> <span className="tex-[14px]">{" "}{openRequests}</span>
      </div>
    </div>
  );
};

export default RecentActivity;