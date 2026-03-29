import { useState } from 'react'
import { C } from '../lib/theme'
import { useAdhan } from '../hooks/useAdhan'
import { getAdhanUrl } from '../lib/api'
import { IslamicBg } from '../components/ui/IslamicBg'
import { MuqarnasHeader } from '../components/ui/MuqarnasHeader'
import { OrnateFrame } from '../components/ui/OrnateFrame'
import { Divider } from '../components/ui/Divider'
import { StarRosette } from '../components/ui/StarRosette'

const RECITERS = [
  { key:'mishary', label:'Sheikh Mishary Rashid' },
  { key:'abdulbasit', label:'Sheikh Abdul Basit' },
  { key:'sudais', label:'Sheikh Sudais' },
]
const PRAYERS = [
  { key:'fajr', name:'Fajr', icon:'🌙' },
  { key:'dhuhr', name:'Dhuhr', icon:'☀️' },
  { key:'asr', name:'Asr', icon:'🌤' },
  { key:'maghrib', name:'Maghrib', icon:'🌆' },
  { key:'isha', name:'Isha', icon:'🌌' },
]
const ADHAN_LINES = [
  { ar:'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ', tr:'Allah is the Greatest (x4)' },
  { ar:'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ', tr:'I bear witness there is no god but Allah (x2)' },
  { ar:'أَشْهَدُ أَنَّ مُحَمَّدًا رَسُولُ اللَّهِ', tr:'I bear witness Muhammad is Allahs Messenger (x2)' },
  { ar:'حَيَّ عَلَى الصَّلَاةِ', tr:'Come to prayer (x2)' },
  { ar:'حَيَّ عَلَى الْفَلَاحِ', tr:'Come to success (x2)' },
  { ar:'اللَّهُ أَكْبَرُ لَا إِلَهَ إِلَّا اللَّهُ', tr:'Allah is the Greatest, there is no god but Allah' },
]

export function AdhanScreen() {
  const [reciter, setReciter] = useState('mishary')
  const { playing, loading, play } = useAdhan()
  return (
    <div style={{padding:'0 0 20px',overflowY:'auto',height:'100%',position:'relative'}}>
      <IslamicBg opacity={0.06} variant="arabesque"/>
      <MuqarnasHeader/>
      <div style={{padding:'0 15px'}}>
        <div style={{textAlign:'center',padding:'14px 0 8px',position:'relative'}}>
          <div style={{position:'absolute',top:10,right:0}}><StarRosette size={36}/></div>
          <div style={{position:'absolute',top:10,left:0}}><StarRosette size={36}/></div>
          <div style={{fontSize:11,color:C.goldDim,letterSpacing:3}}>الأَذَان</div>
          <div style={{fontSize:21,fontWeight:700,color:C.text,fontFamily:'Georgia,serif'}}>Adhan</div>
        </div>
        <Divider/>
        <OrnateFrame style={{marginBottom:14}}>
          <div style={{textAlign:'center',fontSize:13,color:C.gold,fontWeight:600,marginBottom:12}}>أَلْفَاظُ الأَذَانِ</div>
          {ADHAN_LINES.map((l,i)=>(
            <div key={i} style={{marginBottom:11,paddingBottom:11,borderBottom:i<ADHAN_LINES.length-1?`1px solid ${C.border}`:'none'}}>
              <div style={{fontSize:17,color:C.gold,fontFamily:'Georgia,serif',textAlign:'right',lineHeight:1.7,marginBottom:3}}>{l.ar}</div>
              <div style={{fontSize:11,color:C.textDim,fontStyle:'italic'}}>{l.tr}</div>
            </div>
          ))}
        </OrnateFrame>
        <div style={{marginBottom:14}}>
          <div style={{fontSize:12,color:C.gold,fontWeight:600,marginBottom:8}}>Select Reciter</div>
          <div style={{display:'flex',flexWrap:'wrap',gap:7}}>
            {RECITERS.map(r=>(
              <button key={r.key} onClick={()=>setReciter(r.key)} style={{padding:'6px 12px',borderRadius:20,fontSize:11,cursor:'pointer',background:reciter===r.key?C.gold:'transparent',color:reciter===r.key?C.bg:C.textDim,border:`1px solid ${reciter===r.key?C.gold:C.border}`}}>{r.label}</button>
            ))}
          </div>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:8}}>
          {PRAYERS.map(p=>{
            const isPlaying=playing===p.key
            return (
              <div key={p.key} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 14px',borderRadius:11,background:isPlaying?`${C.gold}18`:C.card,border:`1px solid ${isPlaying?C.gold:C.border}`}}>
                <div style={{display:'flex',alignItems:'center',gap:11}}>
                  <span style={{fontSize:20}}>{p.icon}</span>
                  <div>
                    <div style={{fontSize:14,fontWeight:600,color:C.text}}>{p.name} Adhan</div>
                    <div style={{fontSize:11,color:C.textDim}}>{RECITERS.find(r=>r.key===reciter)?.label}</div>
                  </div>
                </div>
                <button onClick={()=>play(getAdhanUrl(reciter),p.key)} style={{width:42,height:42,borderRadius:'50%',cursor:'pointer',background:isPlaying?C.gold:`${C.gold}20`,border:`1px solid ${C.gold}`,fontSize:16,display:'flex',alignItems:'center',justifyContent:'center'}}>
                  {loading&&isPlaying?'…':isPlaying?'⏹':'▶'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
