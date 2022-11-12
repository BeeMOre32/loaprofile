import { getColor } from "../../func/function"
import { useContext } from "react"
import { ColumnFlexDiv, IconImg, ItemFlexDiv, SmallText } from "../atoms/styles"
import { LoaContext } from "../contexts"

const EquipProfile: React.FC<MainEquipInfo> = (info) => {

    const { isSecret, isDark } = useContext(LoaContext)

    return (
      <ColumnFlexDiv>
        {[...info.defense, info.weapon].map((a, idx) => (
            <ItemFlexDiv key={idx}>
                <IconImg src={a.src} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid ${a.color}`}}/>
                <div>
                    <SmallText>
                        {a.name}
                    </SmallText>
                    <br/>
                    { isSecret 
                    ? <SmallText>
                        {a.set} {a.setLv ? `Lv.${a.setLv}` : ""}
                    </SmallText>
                    : <SmallText>
                        {a.set} {a.setLv ? `Lv.${a.setLv}` : ""} 품질 <b style={{color: getColor(a.quality, isDark)}}>{a.quality}</b>
                    </SmallText>}
                </div>
            </ItemFlexDiv>
        ))}
      </ColumnFlexDiv>
    )
  }
  
  export default EquipProfile