import { C } from '../lib/theme'
import { useQibla } from '../hooks/useQibla'
import { IslamicBg } from '../components/ui/IslamicBg'
import { MuqarnasHeader } from '../components/ui/MuqarnasHeader'
import { OrnateFrame } from '../components/ui/OrnateFrame'
import { Divider } from '../components/ui/Divider'
import { StarRosette } from '../components/ui/StarRosette'
import { Loader, ErrMsg } from './HomeScreen'

function Compass({ needleAngle }) {
  const S=260, cx=130, cy=130
  const toXY=(deg,r)=>{const rad=(deg-90)*Math.PI/180;return[cx+r*Math.cos(rad),cy+r*Math.sin(rad)]}
  return (
    <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} style={{overflow:'visible'}}>
      <circle cx={cx} cy={cy} r={122} fill="none" stroke={C.border} strokeWidth="2"/>
      <circle cx={cx} cy={cy} r={108} fill={C.card} stroke={C.goldDim} strokeWidth="1" strokeDasharray="3 5"/>
      {Array.from({length:72},(_,i)=>{const a=(i*5-90)*Math.PI/180,big=i%9===0,r1=108,r2=big?94:101;return <line key={i} x1={cx+r1*Math.cos(a)} y1={cy+r1*Math.sin(a)} x2={cx+r2*Math.cos(a)} y2={cy+r2*Math.sin(a)} stroke={C.goldDim} strokeWidth={big?1.5:0.7}/>})}
      {[['N',0,C.teal],['E',90,C.textDim],['S',180,C.textDim],['W',270,C.textDim]].map(([l,a,col])=>{const[x,y]=toXY(a,82);return <text key={l} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={col} fontSize="13" fontWeight="700">{l}</text>})}
      <g transform={`rotate(${needleAngle},${cx},${cy})`}>
        <polygon points={`${cx},${cy-95} ${cx-7},${cy} ${cx+7},${cy}`} fill={C.gold} opacity="0.95"/>
        <polygon points={`${cx},${cy+95} ${cx-7},${cy} ${cx+7},${cy}`} fill={C.border} opacity="0.8"/>
        <circle cx={cx} cy={cy} r={10} fill={C.gold}/>
        <circle cx={cx} cy={cy} r={5} fill={C.bg}/>
      </g>
      <text x={cx} y={cy+1.5} textAnchor="middle" dominantBaseline="middle" fontSize="11">🕋</text>
    </svg>
  )
}

export function QiblaScreen({ lat, lng }) {
  const { qiblaAngle, needleAngle, hasCompass, loading, error, requestCompass } = useQibla(lat, lng)
  const deg = Math.round(((needleAngle % 360) + 360) % 360)
  const aligned = deg < 10 || deg > 350
  if (loading) return <Loader msg="Finding Qibla direction…"/>
  if (error) return <ErrMsg msg={error}/>
  return (
    <div style={{padding:'0 0 20px',overflowY:'auto',height:'100%',position:'relative'}}>
      <IslamicBg opacity={0.06} variant="zellige"/>
      <MuqarnasHeader/>
      <div style={{padding:'0 15px'}}>
        <div style={{textAlign:'center',padding:'14px 0 8px',position:'relative'}}>
          <div style={{position:'absolute',top:10,right:0}}><StarRosette size={36}/></div>
          <div style={{position:'absolute',top:10,left:0}}><StarRosette size={36}/></div>
          <div style={{fontSize:11,color:C.goldDim,letterSpacing:3}}>الـقـبـلـة</div>
          <div style={{fontSize:21,fontWeight:700,color:C.text,fontFamily:'Georgia,serif'}}>Qibla Direction</div>
        </div>
        <Divider/>
        <div style={{display:'flex',justifyContent:'center',margin:'12px 0'}}><Compass needleAngle={needleAngle}/></div>
        {aligned && <div style={{textAlign:'center',padding:'8px 16px',margin:'0 0 12px',background:`${C.green}18`,border:`1px solid ${C.green}`,borderRadius:20,fontSize:13,color:C.green,fontWeight:600}}>✅ You are facing the Qibla!</div>}
        <OrnateFrame style={{textAlign:'center',marginBottom:12}}>
          <div style={{fontSize:46,fontWeight:300,color:C.gold,letterSpacing:2}}>{Math.round(qiblaAngle ?? 0)}°</div>
          <div style={{fontSize:12,color:C.textDim,marginTop:-4}}>from North · Makkah Al-Mukarramah</div>
        </OrnateFrame>
        {!hasCompass && <button onClick={requestCompass} style={{width:'100%',padding:'12px',borderRadius:11,cursor:'pointer',background:`${C.gold}18`,border:`1px solid ${C.gold}`,color:C.gold,fontSize:13,fontWeight:600}}>📱 Enable Device Compass (iOS)</button>}
      </div>
    </div>
  )
}
