const ChartLegend = () => {
    return (
        <div className='flex gap-5 absolute top-4 left-8'>
            <div className='flex gap-2 items-center'>
                <div className='h-5 w-5 rounded-sm' style={{ 'background': 'linear-gradient(270deg, #415E91 0%, #2D3E5C 100%)' }} />
                <p>Power loss</p>
            </div>
            <div className='flex gap-2 items-center'>
                <div className='h-5 w-5 rounded-sm'  style={{ 'background': 'linear-gradient(270deg, #FFB647 0%, #FF9A00 100%)' }}   />
                <p>Fiber loss</p>
            </div>
            <div className='flex gap-2 items-center'>
                <div className='h-5 w-5 rounded-sm' style={{ 'background': 'linear-gradient(270deg, #EB5154 0%, #BF1E21 100%)' }} />
                <p>Total loss</p>
            </div>
        </div>
    );
};

export default ChartLegend;