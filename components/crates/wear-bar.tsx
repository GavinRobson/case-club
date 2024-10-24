const WearBar = ({ float }: { float: number }) => {
  const arrowPosition = `${float * 200}`
  return ( 
    <div className="relative w-[200px] h-[3px] bg-[#e0e0e0]">
      <div className="flex w-full h-full">
        <div style={{ width: "7%", backgroundColor: 'darkgreen'}} />
        <div style={{ width: "8%", backgroundColor: 'lightgreen'}} />
        <div style={{ width: "23%", backgroundColor: 'yellowgreen'}} />
        <div style={{ width: "7%", backgroundColor: 'orange'}} />
        <div style={{ width: "55%", backgroundColor: 'red'}} />
      </div>

      <div 
        style={{
          position: 'absolute',
          bottom: '-5px', // Position above the bar
          left: `${arrowPosition}px`,
          transform: 'translateX(-50%)',
          width: '0',
          height: '0',
          borderLeft: '5px solid transparent',
          borderRight: '5px solid transparent',
          borderBottom: '5px solid white', // Color of the arrow
        }}
      />
    </div>
   );
}
 
export default WearBar ;