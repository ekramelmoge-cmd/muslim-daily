import { C } from '../../lib/theme'
import { ArabesqueBorder } from './ArabesqueBorder'
import { StarRosette } from './StarRosette'
export function OrnateFrame({ children, style={} }) {
  return (
    <div style={{position:'relative',...style}}>
      <ArabesqueBorder width={390}/>
      {[{top:-10,left:-6},{top:-10,right:-6}].map((pos,i)=>(
        <div key={i} style={{position:'absolute',zIndex:2,...pos}}><StarRosette size={20}/></div>
      ))}
      <div style={{background:'#1a2235',border:'1px solid #2a3550',borderTop:'2px solid #c9a84c',borderBottom:'2px solid #c9a84c',padding:'16px 18px'}}>
        {children}
      </div>
      <ArabesqueBorder width={390} flip={true}/>
    </div>
  )
}
