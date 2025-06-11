const RecentActivity = ({clientInfo}) => {

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(dateString));
  };

  return (
    <div className="w-[303px] p-[25px] bg-white rounded-md border-2 border-[#96a5ba] flex flex-col gap-[15px]">
      <div className="text-[#2d3e5c] leading-[24px] font-lato">
        <div className="font-semibold font-lato text-base">Last Service:</div>
        <div className="text-[14px] font-medium">{" "}{formatDate(clientInfo.lastService)}</div>
      </div>
      <div className="text-[#d45815] leading-[24px] font-lato">
        <div className="font-semibold font-lato text-base">Next Visit:</div>
        <div className="text-[14px] font-medium">{" "}{formatDate(clientInfo.nextVisit)}, {clientInfo.nextScheduledVisitType.join(", ")}</div>
      </div>
      <div className="text-[#2d3e5c] leading-[24px] font-lato">
        <div className="font-semibold font-lato text-base">Open Requests:</div> <div className="text-[14px] font-medium">{" "}["None"]</div>
      </div>
    </div>
  );
};

export default RecentActivity;