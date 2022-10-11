interface JewelProps {
    jewels: JewelInfo[]
}

const JewelProfile: React.FC<JewelProps> = ({jewels}: JewelProps) => {

    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        margin: "0 auto"
      }}>
        {jewels.map((a, idx) => (
            <div key={idx}>
                <div style={{
                    display: "flex",
                    alignContent: "center",
                    position: "relative",
                    textAlign: 'left',
                    height: "45px",
                    margin: "2px auto",
                    width: "100%"
                }}>
                    <img src={a.src} crossOrigin="anonymous" style={{ width: '40px', height: '40px', marginRight: "2px", border: `2px solid ${a.color}`}}/>
                    <div style={{
                        backgroundColor: "black", color: "white", lineHeight: "15px",
                        textAlign: "center",
                        width: '15px', height: "15px", position:"absolute", bottom: "7px", right: "3px"
                    }}>
                        {a.level}
                    </div>
                </div>
            </div>
        ))}
      </div>
    )
  }
  
  export default JewelProfile