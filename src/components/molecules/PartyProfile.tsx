import { Card, Tooltip } from 'antd'
import React from 'react'

const PartyProfile: React.FC<CharInfo> = (info) => {

  return (
    <Card.Grid hoverable={false} style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      border: '1px solid lightgray',
      width: "100%", margin: '3px'
    }}>
        <div style={{
            width: "100%"
        }}>
            <b style={{fontSize: "20px", lineHeight: "30px"}}>
                #대표서버 #{info.mainInfo.server} #원정대Lv.{info.mainInfo.partyLv} 
            </b>
            <br/>
            <b style={{fontSize: "13px", lineHeight: "30px"}}>
                Made By LOA Profile
            </b>
        </div>
        <div style={{
            textAlign: "center",
            marginTop: "15px",
            width: "100%"
        }}>
            <table width="100%" style={{fontSize: "16px"}}>
            <thead>
                <tr>
                    {info.collectInfo.map((a, idx) => (
                        <Tooltip key={idx} title={a.name}>
                            <th>
                                <img src={`images/collections/${a.name}.png`} />
                            </th>
                        </Tooltip>
                    ))}
                </tr>
            </thead>
            <tbody>            
                <tr>
                    {info.collectInfo.map((a, idx) => (
                        <th key={idx}>
                            {a.value}
                        </th>
                    ))}
                </tr>
            </tbody>
            </table>
        </div>
    </Card.Grid>
  )
}

export default PartyProfile