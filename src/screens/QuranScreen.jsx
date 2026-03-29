import { useState, useEffect } from 'react'
import { C } from '../lib/theme'
import { fetchSurahList, fetchSurah } from '../lib/api'
import { IslamicBg } from '../components/ui/IslamicBg'
import { MuqarnasHeader } from '../components/ui/MuqarnasHeader'
import { OrnateFrame } from '../components/ui/OrnateFrame'
import { Divider } from '../components/ui/Divider'
import { StarRosette } from '../components/ui/StarRosette'
import { Loader } from './HomeScreen'

export function QuranScreen() {
  const [surahs, setSurahs] = useState([])
  const [selected, setSelected] = useState(null)
  const [ayahs, setAyahs] = useState([])
  const [search, setSearch] = useState('')
  const [showTr, setShowTr] = useState(true)
  const [loading, setLoading] = useState(true)
  const [loadingS, setLoadingS] = useState(false)

  useEffect(()=>{
    fetchSurahList().then(d=>{ setSurahs(d); setLoading(false) }).catch(()=>setLoading(false))
  },[])

  const openSurah = async s => {
    setSelected(s); setLoadingS(true)
    try { const d = await fetchSurah(s.number); setAyahs(d.ayahs) } catch { setAyahs([]) }
    setLoadingS(false)
  }

  const filtered = surahs.filter(s =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search) ||
    s.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
    String(s.number).includes(search)
  )

  if (selected) {
    return (
      <div style={{height:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
        <IslamicBg opacity={0.05} variant="girih"/>
        <div style={{display:'flex',alignItems:'center',gap:10,padding:'12px 14px',background:C.surface,borderBottom:`1px solid ${C.border}`,flexShrink:0,position:'relative'}}>
          <button onClick={()=>{setSelected(null);setAyahs([])}} style={{padding:'6px 12px',borderRadius:8,cursor:'pointer',fontSize:12,background:'transparent',border:`1px solid ${C.border}`,color:C.text}}>Back</button>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:700,color:C.text}}>{selected.englishName}</div>
            <div style={{fontSize:10,color:C.textDim}}>{selected.englishNameTranslation} · {selected.numberOfAyahs} verses</div>
          </div>
          <button onClick={()=>setShowTr(!showTr)} style={{padding:'5px 10px',borderRadius:8,cursor:'pointer',fontSize:11,fontWeight:600,background:showTr?`${C.gold}22`:'transparent',border:`1px solid ${showTr?C.gold:C.border}`,color:showTr?C.gold:C.textDim}}>EN</button>
        </div>
        <div style={{overflowY:'auto',flex:1,padding:'0 14px 20px',position:'relative'}}>
          <OrnateFrame style={{textAlign:'center',marginBottom:14,marginTop:4}}>
            <div style={{display:'flex',justifyContent:'center',gap:12,alignItems:'center'}}>
              <StarRosette size={28}/>
              <div style={{fontSize:28,color:C.gold,fontFamily:'Georgia,serif'}}>{selected.name}</div>
              <StarRosette size={28}/>
            </div>
          </OrnateFrame>
          {loadingS ? <Loader msg="Loading surah…"/> : ayahs.map((a,i)=>(
            <div key={i} style={{marginBottom:13,padding:14,borderRadius:11,background:C.card,border:`1px solid ${C.border}`}}>
              <div style={{width:28,height:28,borderRadius:'50%',background:`${C.gold}18`,border:`1px solid ${C.gold}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,color:C.gold,fontWeight:700,marginBottom:10}}>{a.number}</div>
              <div style={{fontSize:20,color:C.text,fontFamily:'Georgia,serif',textAlign:'right',lineHeight:1.9,marginBottom:8}}>{a.arabic}</div>
              {showTr&&<div style={{fontSize:12,color:C.textDim,lineHeight:1.7,fontStyle:'italic',borderTop:`1px solid ${C.border}`,paddingTop:8}}>{a.english}</div>}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (loading) return <Loader msg="Loading Quran…"/>

  return (
    <div style={{height:'100%',display:'flex',flexDirection:'column',position:'relative'}}>
      <IslamicBg opacity={0.06} variant="zellige"/>
      <MuqarnasHeader/>
      <div style={{padding:'10px 14px 8px',flexShrink:0,position:'relative'}}>
        <div style={{textAlign:'center',marginBottom:8}}>
          <div style={{fontSize:11,color:C.goldDim,letterSpacing:3}}>الْقُرْآنُ الْكَرِيمُ</div>
          <div style={{fontSize:21,fontWeight:700,color:C.text,fontFamily:'Georgia,serif'}}>Holy Quran</div>
        </div>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search surahs…" style={{width:'100%',padding:'10px 14px',borderRadius:11,boxSizing:'border-box',background:C.card,border:`1px solid ${C.border}`,color:C.text,fontSize:13,outline:'none'}}/>
      </div>
      <Divider/>
      <div style={{overflowY:'auto',flex:1,padding:'0 14px 20px'}}>
        {filtered.map(s=>(
          <div key={s.number} onClick={()=>openSurah(s)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'12px 4px',cursor:'pointer',borderBottom:`1px solid ${C.border}55`}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:36,height:36,flexShrink:0,position:'relative'}}>
                <StarRosette size={36} label={s.number}/>
                <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',fontSize:11,color:C.bg,fontWeight:700}}>{s.number}</div>
              </div>
              <div>
                <div style={{fontSize:14,fontWeight:600,color:C.text}}>{s.englishName}</div>
                <div style={{fontSize:11,color:C.textDim}}>{s.englishNameTranslation} · {s.numberOfAyahs} verses</div>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:18,color:C.gold,fontFamily:'Georgia,serif'}}>{s.name}</div>
              <div style={{fontSize:9,color:C.textDim,marginTop:1}}>{s.revelationType}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
