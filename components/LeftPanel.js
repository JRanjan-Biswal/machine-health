import React from 'react';
import Image from 'next/image';

const LeftPanel = () => {
  return (
    <div className='w-full relative h-full'>
      <Image src="/login_left_panel.png" alt="background image" width={700} height={1000} className='object-cover w-full h-full object-top'/>
      <Image src="/login_left_panel_machine.png" alt="machine image" width={700} height={700} className='w-full h-auto max-h-[500px] object-contain absolute bottom-0 z-10' />
    </div>
  );
};

export default LeftPanel;

