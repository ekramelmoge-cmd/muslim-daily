import { C } from '../../lib/theme'
export function IslamicBg({ opacity = 0.055, variant = 'girih' }) {
  const id = `pat_${variant}`
  return (
    <svg style={{position:'absolute',top:0,left:0,width:'100%',height:'100%',pointerEvents:'none'}} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {variant === 'girih' && (
          <pattern id={id} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            {Array.from({length:12},(_,i)=>{const a1=(i*30-90)*Math.PI/180,a2=((i*30+15)-90)*Math.PI/180,r1=32,r2=13;return <polygon key={i} points={`40,40 ${40+r1*Math.cos(a1)},${40+r1*Math.sin(a1)} ${40+r2*Math.cos(a2)},${40+r2*Math.sin(a2)}`} fill="none" stroke={C.gold} strokeWidth="0.5"/>})}
            <circle cx="40" cy="40" r="5" fill="none" stroke={C.gold} strokeWidth="0.6"/>
          </pattern>
        )}
        {variant === 'arabesque' && (
          <pattern id={id} x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
            {Array.from({length:8},(_,i)=>{const a1=(i*45-90)*Math.PI/180,a2=((i*45+22.5)-90)*Math.PI/180,r1=20,r2=8;return <polygon key={i} points={`25,25 ${25+r1*Math.cos(a1)},${25+r1*Math.sin(a1)} ${25+r2*Math.cos(a2)},${25+r2*Math.sin(a2)}`} fill="none" stroke={C.gold} strokeWidth="0.5"/>})}
            <circle cx="25" cy="25" r="4" fill="none" stroke={C.gold} strokeWidth="0.5"/>
          </pattern>
        )}
        {variant === 'zellige' && (
          <pattern id={id} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            {Array.from({length:6},(_,i)=>{const a=(i*60)*Math.PI/180,x=20+18*Math.cos(a),y=20+18*Math.sin(a);return <circle key={i} cx={x} cy={y} r="3" fill="none" stroke={C.gold} strokeWidth="0.5"/>})}
            <circle cx="20" cy="20" r="3" fill="none" stroke={C.gold} strokeWidth="0.5"/>
          </pattern>
        )}
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity}/>
    </svg>
  )
}
