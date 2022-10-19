import { jobBooks } from "../../func/constant"

interface StatProps {
    stats: BaseKeyVal[]
}

const StatProfile: React.FC<StatProps> = (info) => {

    return (
        <div style={{marginBottom: '10px'}}>
            <b style={{fontSize: "15px"}}>전투 특성</b>
            {info.stats.filter(a => a.value > 150).map((a, idx) => (
                <div style={{textAlign: "left"}} key={idx}>
                    <b style={{fontSize: "13px", marginLeft: "5px"}}>
                        {a.name} {a.value}
                    </b>
                    <br/>
                </div>
            ))}
        </div>
    )
  }
  
  export default StatProfile