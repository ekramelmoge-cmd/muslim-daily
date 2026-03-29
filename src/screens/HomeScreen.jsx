import { C } from '../lib/theme'
import { usePrayerTimes } from '../hooks/usePrayerTimes'
import { IslamicBg } from '../components/ui/IslamicBg'
import { MuqarnasHeader } from '../components/ui/MuqarnasHeader'
import { OrnateFrame } from '../components/ui/OrnateFrame'
import { Divider } from '../components/ui/Divider'
import { StarRosette } from '../components/ui/StarRosette'

export function Loader({ msg }) {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:12}}>
      <div style={{width:36,height:36,border:`3px solid ${C.border}`,borderTop:`3px solid ${C.gold}`,borderRadius:'50%',animation:'spin 1s linear infinite'}}/>
      <div style={{fontSize:13,color:C.textDim}}>{msg}</div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

export function ErrMsg({ msg }) {
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',height:'100%',gap:8,padding:20}}>
      <div style={{fontSize:32}}>⚠️</div>
      <div style={{fontSize:13,color:C.textDim,textAlign:'center'}}>{msg}</div>
    </div>
  )
}

export function HomeScreen({ lat, lng, city, method }) {
  const { prayers, meta, loading, error } = usePrayerTimes(lat, lng, method)
  const next = prayers.find(p => p.isNext)

  const countdown = () => {
    if (!next) return ''
    const now = new Date().getHours()*60 + new Date().getMinutes()
    const diff = next.mins - now
    if (diff <= 0) return 'Now'
    const h=Math.floor(diff/60), m=diff%60
    return h > 0 ? `${h}h ${m}m` : `${m} min`
  }

  const dateStr = new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'})

  if (loading) return <Loader msg="Calculating prayer times…"/>
  if (error) return <ErrMsg msg={error}/>

  return (
    <div style={{padding:'0 0 20px',overflowY:'auto',height:'100%',position:'relative'}}>
      <IslamicBg opacity={0.07} variant="girih"/>
      <MuqarnasHeader/>
      <div style={{textAlign:'center',padding:'12px 15px 8px',position:'relative'}}>
        <div style={{position:'absolute',top:10,right:8}}><StarRosette size={40}/></div>
        <div style={{position:'absolute',top:10,left:8}}><StarRosette size={40}/></div>
        <div style={{fontSize:13,color:C.goldDim,fontFamily:'Georgia,serif',marginBottom:2}}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div style={{fontSize:21,fontWeight:700,color:C.text,fontFamily:'Georgia,serif'}}>Prayer Times</div>
        <div style={{fontSize:11,color:C.textDim,marginTop:3}}>{dateStr}</div>
        <div style={{fontSize:11,color:C.gold,marginTop:2}}>📍 {city}</div>
      </div>
      <div style={{padding:'0 15px'}}>
        <Divider/>
        {next && (
          <OrnateFrame style={{textAlign:'center',marginBottom:14}}>
            <div style={{fontSize:10,color:C.goldDim,letterSpacing:3,marginBottom:5}}>NEXT PRAYER</div>
            <div style={{fontSize:30,fontWeight:800,color:C.gold,fontFamily:'Georgia,serif'}}>{next.name}</div>
            <div style={{fontSize:15,color:C.goldDim,fontFamily:'Georgia,serif',marginBottom:6}}>{next.arabic}</div>
            <div style={{fontSize:34,fontWeight:300,color:C.text,letterSpacing:3}}>{next.timeStr}</div>
            <div style={{display:'inline-block',marginTop:10,padding:'4px 16px',background:C.goldGlow,border:`1px solid ${C.goldDim}`,borderRadius:20,fontSize:12,color:C.goldLight}}>⏱ {countdown()} remaining</div>
          </OrnateFrame>
        )}
        <div style={{display:'flex',flexDirection:'column',gap:7}}>
          {prayers.map(p=>(
            <div key={p.key} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 14px',background:p.isNext?`${C.gold}14`:C.card,borderRadius:11,border:`1px solid ${p.isNext?C.gold:C.border}`,opacity:p.isPast&&!p.isNext?.8:1,position:'relative',overflow:'hidden'}}>
              {p.isNext && <IslamicBg opacity={0.04} variant="arabesque"/>}
              <div style={{display:'flex',alignItems:'center',gap:11,position:'relative'}}>
                <span style={{fontSize:20}}>{p.icon}</span>
                <div>
                  <div style={{fontSize:14,fontWeight:600,color:p.isNext?C.goldLight:C.text}}>{p.name}</div>
                  <div style={{fontSize:11,color:C.goldDim,fontFamily:'Georgia,serif'}}>{p.arabic}</div>
                </div>
              </div>
              <div style={{textAlign:'right',position:'relative'}}>
                <div style={{fontSize:15,fontWeight:600,color:p.isNext?C.gold:C.text}}>{p.timeStr}</div>
                {p.isPast && <div style={{fontSize:9,color:C.green,marginTop:1}}>✓ Passed</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
