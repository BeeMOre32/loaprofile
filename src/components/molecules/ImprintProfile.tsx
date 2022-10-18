import { jobBooks } from "../../func/constant"

interface ImprintProps {
    imprinting: BaseKeyVal[]
}

const ImprintProfile: React.FC<ImprintProps> = (info) => {

    return (
        <div>
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
  
  export default ImprintProfile