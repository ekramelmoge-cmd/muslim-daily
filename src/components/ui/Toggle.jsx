import { C } from '../../lib/theme'
export function Toggle({ on, set }) {
  return (
    <div onClick={()=>set(!on)} style={{width:44,height:24,borderRadius:12,cursor:'pointer',background:on?C.gold:C.border,position:'relative',transition:'background .3s',flexShrink:0}}>
      <div style={{position:'absolute',top:2,left:on?22:2,width:20,height:20,borderRadius:'50%',background:'white',transition:'left .3s'}}/>
    </div>
  )
}
