import { Tooltip } from "antd"
import { BigText, IconImg, ItemFlexDiv } from "../atoms/styles"

interface JewelProps {
    jewels: JewelInfo[]
    isSimple: boolean
}

const JewelProfile: React.FC<JewelProps> = ({jewels, isSimple}: JewelProps) => {

    return (
      <ItemFlexDiv style={{
        justifyContent: "center", 
        flexWrap: "wrap", 
        maxWidth: isSimple ? "270px" : "500px",
        margin: "2px auto"
      }}>
        {jewels.length > 0 ? jewels.map((a, idx) => (
            <Tooltip title={a.desc}>
                <div key={idx} style={{position: "relative"}}>
                    <IconImg src={a.src} crossOrigin="anonymous" style={{margin: "1px", border: `2px solid ${a.color}`}}/>
                    <div style={{
                        backgroundColor: "black", color: "white", lineHeight: "15px",
                        textAlign: "center", fontWeight: 600,
                        width: '17px', height: "17px", position:"absolute", bottom: "1px", right: "2px"
                    }}>
                        {a.level}
                    </div>
                </div>
            </Tooltip>
        )) : <BigText>장착한 보석이 없습니다.</BigText>}
      </ItemFlexDiv>
    )
  }
  
  export default JewelProfile