import { C } from '../lib/theme'
import { IslamicBg } from '../components/ui/IslamicBg'
import { MuqarnasHeader } from '../components/ui/MuqarnasHeader'
import { OrnateFrame } from '../components/ui/OrnateFrame'
import { Divider } from '../components/ui/Divider'
import { StarRosette } from '../components/ui/StarRosette'

export { Loader, ErrMsg } from './HomeScreen'

const METHODS = [
  { id:2, label:'ISNA (North America)' },
  { id:3, label:'Muslim World League' },
  { id:4, label:'Umm Al-Qura (Makkah)' },
  { id:5, label:'Egyptian General Authority' },
  { id:18, label:'Gulf Region' },
]

export function SettingsScreen({ method, setMethod }) {
  return (
    <div style={{padding:'0 0 20px',overflowY:'auto',height:'100%',position:'relative'}}>
      <IslamicBg opacity={0.06} variant="girih"/>
      <MuqarnasHeader/>
      <div style={{padding:'0 14px'}}>
        <div style={{textAlign:'center',padding:'14px 0 8px',position:'relative'}}>
          <div style={{position:'absolute',top:10,right:0}}><StarRosette size={36}/></div>
          <div style={{position:'absolute',top:10,left:0}}><StarRosette size={36}/></div>
          <div style={{fontSize:21,fontWeight:700,color:C.text,fontFamily:'Georgia,serif'}}>Settings</div>
        </div>
        <Divider/>
        <div style={{marginBottom:18}}>
          <div style={{fontSize:12,color:C.gold,fontWeight:600,marginBottom:8}}>Calculation Method</div>
          <div style={{background:C.card,borderRadius:11,padding:'4px 14px',border:`1px solid ${C.border}`}}>
            {METHODS.map(m=>(
              <div key={m.id} onClick={()=>setMethod(m.id)} style={{display:'flex',alignItems:'center',gap:10,padding:'9px 4px',borderBottom:`1px solid ${C.border}`,cursor:'pointer'}}>
                <div style={{width:18,height:18,borderRadius:'50%',border:`2px solid ${method===m.id?C.gold:C.border}`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  {method===m.id&&<div style={{width:8,height:8,borderRadius:'50%',background:C.gold}}/>}
                </div>
                <span style={{fontSize:13,color:method===m.id?C.text:C.textDim}}>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
        <OrnateFrame style={{textAlign:'center'}}>
          <div style={{display:'flex',justifyContent:'center',gap:10,alignItems:'center',marginBottom:8}}>
            <StarRosette size={22}/>
            <div style={{fontSize:24,color:C.gold,fontFamily:'Georgia,serif'}}>رَبِّ زِدْنِي عِلْمًا</div>
            <StarRosette size={22}/>
          </div>
          <div style={{fontSize:12,color:C.textDim,fontStyle:'italic'}}>"My Lord, increase me in knowledge."</div>
          <div style={{fontSize:10,color:C.goldDim,marginTop:4}}>Quran 20:114</div>
        </OrnateFrame>
      </div>
    </div>
  )
}
