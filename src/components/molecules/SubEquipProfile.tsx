import { getColor } from "../../func/function"
import { useContext } from "react"
import { ColumnFlexDiv, IconImg, ItemFlexDiv, SmallText } from "../atoms/styles"
import { LoaContext } from "../contexts"

const SubEquipProfile: React.FC<SubEquipInfo> = (info) => {

    const { isSecret, isDark } = useContext(LoaContext)

    return ( !info ? null : 
      <ColumnFlexDiv>
        {info.accessory.map((a, idx) => (
            <div key={idx}>
                <ItemFlexDiv>
                    <IconImg src={a.src} crossOrigin="anonymous" style={{border: `2px solid ${a.color}`}}/>
                    <div>
                        <SmallText>
                            {a.name.split(" ")[2]}
                        </SmallText>
                        <br/>
                        <SmallText>
                            품질 <b style={{color: getColor(a.quality, isDark)}}>{a.quality}</b>
                        </SmallText>
                    </div>
                </ItemFlexDiv>
            </div>
        ))}
        {info.brace.name ? 
        <ItemFlexDiv>
            <IconImg src={info.brace.src} crossOrigin="anonymous" style={{border: `2px solid ${info.brace.color}`}}/>
            {isSecret ? <SmallText>??</SmallText> : <div style={{fontSize: "13px", wordBreak: "keep-all", display: "flex", alignItems: 'center'}}>
                <SmallText>{info.brace.options.length > 0 ? info.brace.options.join(" ") : "특수옵션X"}</SmallText>
            </div>}
        </ItemFlexDiv> : null}
      </ColumnFlexDiv>
    )
  }
  
  export default SubEquipProfile