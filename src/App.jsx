import { useState } from 'react'
import { C } from './lib/theme'
import { useLocation } from './hooks/useLocation'
import { BottomNav } from './components/nav/BottomNav'
import { HomeScreen } from './screens/HomeScreen'
import { QiblaScreen } from './screens/QiblaScreen'
import { AdhanScreen } from './screens/AdhanScreen'
import { QuranScreen } from './screens/QuranScreen'
import { SettingsScreen, Loader } from './screens/SettingsScreen'

export default function App() {
  const [tab, setTab] = useState('home')
  const [method, setMethod] = useState(2)
  const { lat, lng, city, loading } = useLocation()

  const time = new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' })

  const screen = () => {
    if (loading) return <Loader msg="Getting your location…"/>
    switch (tab) {
      case 'home':     return <HomeScreen lat={lat} lng={lng} city={city} method={method}/>
      case 'qibla':    return <QiblaScreen lat={lat} lng={lng}/>
      case 'adhan':    return <AdhanScreen/>
      case 'quran':    return <QuranScreen/>
      case 'settings': return <SettingsScreen method={method} setMethod={setMethod}/>
      default:         return null
    }
  }

  return (
    <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',background:'#030507',fontFamily:"'Segoe UI',system-ui,sans-serif"}}>
      <div style={{width:'min(390px, 100vw)',height:'min(844px, 100dvh)',background:C.bg,color:C.text,display:'flex',flexDirection:'column',borderRadius:window.innerWidth<=390?0:44,border:`1px solid ${C.border}`,overflow:'hidden',position:'relative'}}>
        <div style={{height:46,background:C.surface,flexShrink:0,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 22px',borderBottom:`1px solid ${C.border}`}}>
          <span style={{fontSize:13,fontWeight:600,color:C.text}}>{time}</span>
          <span style={{fontSize:13,color:C.gold,fontFamily:'Georgia,serif'}}>Muslim Daily</span>
          <span style={{fontSize:12,color:C.textDim}}>🔋</span>
        </div>
        <div key={tab} style={{flex:1,overflow:'hidden',position:'relative',animation:'fadeSlide .2s ease-out'}}>
          <style>{`@keyframes fadeSlide{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
          {screen()}
        </div>
        <BottomNav tab={tab} setTab={setTab}/>
      </div>
    </div>
  )
}
