import { BigText } from "../atoms/styles"

interface JewelProps {
    jewels: JewelInfo[]
}

const JewelProfile: React.FC<JewelProps> = ({jewels}: JewelProps) => {

    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "0 auto",
        height: "45px",
      }}>
        {jewels.length > 0 ? jewels.map((a, idx) => (
            <div key={idx}>
                <div style={{
                    display: "flex",
                    alignContent: "center",
                    position: "relative",
                    textAlign: 'left',
                    margin: "2px auto",
                    width: "100%"
                }}>
                    <img src={a.src} crossOrigin="anonymous" style={{ width: '40px', height: '40px', marginRight: "2px", border: `2px solid ${a.color}`}}/>
                    <div style={{
                        backgroundColor: "black", color: "white", lineHeight: "15px",
                        textAlign: "center",
                        width: '17px', height: "17px", position:"absolute", bottom: "1px", right: "3px"
                    }}>
                        {a.level}
                    </div>
                </div>
            </div>
        )) : <BigText>장착한 보석이 없습니다.</BigText>}
      </div>
    )
  }
  
  export default JewelProfile