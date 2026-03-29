import { C } from '../../lib/theme'
export function Divider() {
  return (
    <div style={{display:'flex',alignItems:'center',gap:8,margin:'10px 0'}}>
      <div style={{flex:1,height:1,background:`linear-gradient(to right,transparent,${C.goldDim}55)`}}/>
      <span style={{color:C.gold,fontSize:11}}>✦</span>
      <div style={{flex:1,height:1,background:`linear-gradient(to left,transparent,${C.goldDim}55)`}}/>
    </div>
  )
}
