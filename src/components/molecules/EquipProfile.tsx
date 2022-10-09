interface EquipProps {
    equip: EquipInfo[]
}

const EquipProfile: React.FC<EquipProps> = ({equip}: EquipProps) => {

    const newEquip = [...equip.slice(1), equip[0]]

    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
      }}>
        {newEquip.map((a, idx) => (
            <div key={idx}>
                <div style={{
                    display: "flex",
                    alignContent: "center",
                    textAlign: 'left',
                    height: "40px",
                    margin: "2px",
                    width: "100%"
                }}>
                    <img src={a.src} crossOrigin="anonymous" style={{marginRight: "5px", border: `1px solid gray`, backgroundColor: a.color, filter: 'grayscale(35%)'}}/>
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