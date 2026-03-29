import { C } from '../../lib/theme'
export function ArabesqueBorder({ width=390, flip=false }) {
  const count=Math.ceil(width/20)
  return (
    <svg width={width} height={12} style={{display:'block',transform:flip?'scaleY(-1)':'none'}} viewBox={`0 0 ${width} 12`}>
      {Array.from({length:count},(_,i)=>{const x=i*20;return(<g key={i}><path d={`M${x},6 Q${x+5},0 ${x+10},6 Q${x+15},12 ${x+20},6`} fill="none" stroke={C.gold} strokeWidth="0.7" opacity="0.5"/><circle cx={x+10} cy={6} r="1.2" fill={C.gold} opacity="0.4"/></g>)})}
    </svg>
  )
}
