const EquipProfile: React.FC<MainEquipInfo> = (info) => {

    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
      }}>
        {[...info.defense, info.weapon].map((a, idx) => (
            <div key={idx}>
                <div style={{
                    display: "flex",
                    alignContent: "center",
                    textAlign: 'left',
                    height: "40px",
                    margin: "2px",
                    width: "100%"
                }}>
                    <img src={a.src} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid ${a.color}`}}/>
                    <div>
                        <b style={{fontSize: "12px"}}>
                            {a.name}
                        </b>
                        <br/>
                        <b style={{fontSize: "14px"}}>
                            {a.set} {a.setLv ? `Lv.${a.setLv}` : ""} 품질 {a.quality}
                        </b>
                    </div>
                </div>
            </div>
        ))}
      </div>
    )
  }
  
  export default EquipProfile