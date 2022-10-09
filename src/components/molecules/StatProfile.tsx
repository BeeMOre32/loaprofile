import { jobBooks } from "../../func/constant"

const StatProfile: React.FC<StatInfo> = (info) => {

    return (
        <div>
            <b style={{fontSize: "15px"}}>전투 특성</b>
            {info.stats.filter(a => a.value > 150).map((a, idx) => (
                <div style={{textAlign: "left"}} key={idx}>
                    <b style={{fontSize: "13px", marginLeft: "5px"}}>
                        {a.name} {a.value}
                    </b>
                    <br/>
                </div>
            ))}
            <br/>
            <b style={{fontSize: "15px"}}>각인 효과</b>
            {info.imprinting.map((a, idx) => (
                <div style={{textAlign: "left"}} key={idx}>
                    <b style={{fontSize: "13px", textIndent: "5px", wordBreak: "keep-all", color: jobBooks.includes(a.name) ? "red" : "black"}}>
                        {a.name} Lv.{a.value}
                    </b>
                    <br/>
                </div>
            ))}
        </div>
    )
  }
  
  export default StatProfile