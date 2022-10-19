import { getColor } from "../../func/function"
import { ColumnFlexDiv, IconImg, ItemFlexDiv, SmallText } from "../atoms/styles"

const SubEquipProfile: React.FC<SubEquipInfo> = (info) => {

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
                            품질 <b style={{color: getColor(a.quality)}}>{a.quality}</b>
                        </SmallText>
                    </div>
                </ItemFlexDiv>
            </div>
        ))}
        {info.brace.name ? 
        <ItemFlexDiv>
            <IconImg src={info.brace.src} crossOrigin="anonymous" style={{border: `2px solid ${info.brace.color}`}}/>
            <div style={{fontSize: "13px", wordBreak: "keep-all", display: "flex", alignItems: 'center'}}>
                <b>{info.brace.options.length > 0 ? info.brace.options.join(" ") : "특수옵션X"}</b>
            </div>
        </ItemFlexDiv> : null}
      </ColumnFlexDiv>
    )
  }
  
  export default SubEquipProfile