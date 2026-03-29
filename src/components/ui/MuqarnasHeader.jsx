import { C } from '../../lib/theme'
export function MuqarnasHeader({ width = 390 }) {
  const niches=9, w=width/niches
  return (
    <svg width={width} height={28} style={{display:'block',flexShrink:0}} viewBox={`0 0 ${width} 28`}>
      {Array.from({length:niches},(_,i)=>{const x=i*w,cx=x+w/2;return(<g key={i}><path d={`M${x},28 L${x},14 Q${cx},0 ${x+w},14 L${x+w},28 Z`} fill={`${C.gold}18`} stroke={C.goldDim} strokeWidth="0.6"/><circle cx={cx} cy={10} r="2" fill={C.gold} opacity="0.5"/></g>)})}
      <line x1="0" y1="28" x2={width} y2="28" stroke={C.gold} strokeWidth="0.8" opacity="0.4"/>
    </svg>
  )
}
