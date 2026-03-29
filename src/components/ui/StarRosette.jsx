import { C } from '../../lib/theme'
export function StarRosette({ size = 44 }) {
  const cx=size/2, cy=size/2
  const outerPts=Array.from({length:24},(_,i)=>{const a=(i*15-90)*Math.PI/180,r=i%2===0?size*0.47:size*0.22;return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`}).join(' ')
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <polygon points={outerPts} fill={C.gold} opacity="0.85"/>
      <circle cx={cx} cy={cy} r={size*0.28} fill={C.card}/>
    </svg>
  )
}
