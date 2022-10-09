const AccProfile: React.FC<StatInfo> = (info) => {

    return ( !info ? null : 
      <div style={{
        display: "flex",
        flexDirection: "column"
      }}>
        {info.accessories.map((a, idx) => (
            <div key={idx}>
                <div style={{
                    display: "flex",
                    alignContent: "center",
                    textAlign: 'left',
                    height: "40px",
                    margin: "2px",
                    width: "100%"
                }}>
                    <img src={a.src} crossOrigin="anonymous" style={{width: '40px', height: '40px', marginRight: "5px",  border: `1px solid gray`, backgroundColor: a.color, filter: 'grayscale(35%)'}}/>
                    <div>
                        <b style={{fontSize: "12px"}}>
                            {a.name.split(" ")[2]}
                        </b>
                        <br/>
                        <b style={{fontSize: "14px"}}>
                            품질 {a.quality}
                        </b>
                    </div>
                </div>
            </div>
        ))}
        {info.brace.name ? 
        <div style={{
            display: "inline-flex",
            alignItems: 'center',
            textAlign: 'left',
            height: "45px",
            margin: "2px"
        }}>
            <img src={info.brace.src} crossOrigin="anonymous" style={{ width: '40px', height: '40px', marginRight: "5px", border: `1px solid gray`, backgroundColor: info.brace.color, filter: 'grayscale(35%)'}}/>
            <div style={{fontSize: "13px", wordBreak: "keep-all", display: "flex", alignItems: 'center'}}>
                <b>{info.brace.options.length > 0 ? info.brace.options.join(" ") : "특수옵션X"}</b>
            </div>
        </div> : null}
      </div>
    )
  }
  
  export default AccProfile