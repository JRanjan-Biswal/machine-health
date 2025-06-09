const RecentActivity = ({
  lastService = "NIL",
  nextVisitDate = "10/12/2026",
  nextVisitType = "Process Audit",
  openRequests = "[None]"
}) => {
  return (
    <div className="w-[303px] p-[25px] bg-white rounded-md border-2 border-[#96a5ba] flex flex-col gap-[15px]">
      <div className="text-[#2d3e5c] leading-[24px] font-lato">
        <div className="font-semibold font-lato text-base">Last Service:</div><div className="text-[14px] font-medium">{" "}{lastService}</div>
      </div>
      <div className="text-[#d45815] leading-[24px] font-lato">
        <div className="font-semibold font-lato text-base">Next Visit:</div><div className="text-[14px] font-medium">{" "}[{nextVisitDate}, {nextVisitType}]</div>
      </div>
      <div className="text-[#2d3e5c] leading-[24px] font-lato">
        <div className="font-semibold font-lato text-base">Open Requests:</div> <div className="text-[14px] font-medium">{" "}{openRequests}</div>
      </div>
    </div>
  );
};

export default RecentActivity;