import { C } from '../../lib/theme'
export function StarRosette({ size = 44 }) {
  const cx=size/2, cy=size/2
  const outerPts=Array.from({length:24},(_,i)=>{const a=(i*15-90)*Math.PI/180,r=i%2===0?size*0.47:size*0.22;return `${cx+r*Math.cos(a)},${cy+r*Math.sin(a)}`}).join(' ')
  const hexPts=Array.from({length:6},(_,i)=>{const a=(i*60-30)*Math.PI/180;return `${cx+size*0.18*Math.cos(a)},${cy+size*0.18*Math.sin(a)}`}).join(' ')
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={size*0.46} fill={`${C.gold}10`}/>
      <polygon points={outerPts} fill={C.gold} opacity="0.85"/>
      <circle cx={cx} cy={cy} r={size*0.22} fill={C.card} stroke={C.goldDim} strokeWidth="0.5"/>
      <polygon points={hexPts} fill="none" stroke={C.gold} strokeWidth="0.8" opacity="0.7"/>
      <circle cx={cx} cy={cy} r={size*0.08} fill={C.gold} opacity="0.6"/>
    </svg>
  )
}
