import React from 'react';

const StatusLegend = () => {
  return (
    <div className={`flex items-center justify-between px-5 py-2.5 bg-[#dfe6ec] border border-[#96a5ba] rounded-md min-w-[268px] h-[38px] w-[300px] absolute bottom-10`}>
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-[#00a82d]" />
        <span className="text-[#2d3e5c] font-bold text-sm ml-1">Healthy</span>
      </div>
      
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-[#ff9a00]" />
        <span className="text-[#2d3e5c] font-bold text-sm ml-1">Monitor</span>
      </div>
      
      <div className="flex items-center gap-1">
        <div className="w-3 h-3 rounded-full bg-[#bf1e21]" />
        <span className="text-[#2d3e5c] font-bold text-sm ml-1">Attention</span>
      </div>
    </div>
  );
};

StatusLegend.defaultProps = {
  style: {}
};

export default StatusLegend;

