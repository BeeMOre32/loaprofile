import { Card, Tooltip } from 'antd'
import React from 'react'
import { BigText, MediumText, SmallText } from '../atoms/styles'

const PartyProfile: React.FC<CharInfo> = (info) => {

  return (
    <Card.Grid hoverable={false} style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      border: '1px solid lightgray',
      width: "100%"
    }}>
        <div style={{
            width: "100%"
        }}>
            <BigText>#대표서버 #{info.mainInfo.server} #원정대Lv.{info.mainInfo.partyLv} </BigText>
            <MediumText>Made By LOA Profile</MediumText>
        </div>
        <div style={{
            textAlign: "center",
            marginTop: "10px",
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