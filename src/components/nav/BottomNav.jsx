import { C } from '../../lib/theme'
const TABS = [
  { id:'home', icon:'🕌', label:'Prayer' },
  { id:'qibla', icon:'🧭', label:'Qibla' },
  { id:'adhan', icon:'🔊', label:'Adhan' },
  { id:'quran', icon:'📖', label:'Quran' },
  { id:'settings', icon:'⚙️', label:'Settings' },
]
export function BottomNav({ tab, setTab }) {
  return (
    <div style={{height:64,background:C.surface,flexShrink:0,borderTop:`1px solid ${C.border}`,display:'flex'}}>
      {TABS.map(t=>(
        <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,height:'100%',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:3,background:'transparent',border:'none',cursor:'pointer',position:'relative'}}>
          <span style={{fontSize:20,lineHeight:1}}>{t.icon}</span>
          <span style={{fontSize:10,fontWeight:600,color:tab===t.id?C.gold:C.textDim,transition:'color .2s'}}>{t.label}</span>
          {tab===t.id&&<div style={{position:'absolute',bottom:0,width:28,height:2,background:`linear-gradient(to right,transparent,${C.gold},transparent)`,borderRadius:1}}/>}
        </button>
      ))}
    </div>
  )
}
