import { getColor } from "../../func/function"
import { ColumnFlexDiv, IconImg, ItemFlexDiv, SmallText } from "../atoms/styles"

const EquipProfile: React.FC<MainEquipInfo> = (info) => {

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
                    <SmallText>
                        {a.set} {a.setLv ? `Lv.${a.setLv}` : ""} 품질 <b style={{color: getColor(a.quality)}}>{a.quality}</b>
                    </SmallText>
                </div>
            </ItemFlexDiv>
        ))}
      </ColumnFlexDiv>
    )
  }
  
  export default EquipProfile