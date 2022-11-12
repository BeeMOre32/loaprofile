import { jobBooks } from "../../func/constant"
import { SmallText } from "../atoms/styles"

interface ImprintProps {
    imprinting: BaseKeyVal[]
}

const ImprintProfile: React.FC<ImprintProps> = (info) => {

    return (
        <div>
            <b style={{fontSize: "15px"}}>각인 효과</b>
            {info.imprinting.map((a, idx) => (
                <div style={{textAlign: "left"}} key={idx}>
                    <SmallText style={{fontSize: "13px", textIndent: "5px", wordBreak: "keep-all"}}
                        type={jobBooks.includes(a.name) ? "success" : 
                        ( a.name.includes("감소") ? "danger" : undefined)}>
                        {a.name} Lv.{a.value}
                    </SmallText>
                    <br/>
                </div>
            ))}
        </div>
    )
  }
  
  export default ImprintProfile