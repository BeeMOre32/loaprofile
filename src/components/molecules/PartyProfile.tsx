import { Card, Tooltip } from 'antd'
import React from 'react'
import { BigText, MediumText } from '../atoms/styles'

const PartyProfile: React.FC<CharInfo> = (info) => {

  return (
    <Card.Grid hoverable={false} style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      border: '1px solid lightgray',
      width: "100%",
      boxShadow: 'unset'
    }}>
        <BigText style={{wordBreak: "keep-all"}}>#대표 #원정대Lv.{info.mainInfo.partyLv} #{info.mainInfo.server}</BigText>
        <div style={{
            textAlign: "center",
            margin: "10px",
            width: "100%",
            gridColumn: "span 2"
        }}>
            <table width="100%" style={{fontSize: "16px"}}>
                <thead>
                    <tr>
                        {info.collectInfo.map((a, idx) => (
                            <Tooltip key={idx} title={a.name}>
                                <th>
                                    <img alt={a.name} src={`images/collections/${a.name}.png`} />
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
        <MediumText>Made By LOA Profile</MediumText>
    </Card.Grid>
  )
}

export default PartyProfile