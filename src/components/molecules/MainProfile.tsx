import React from 'react'
import { BigText, IconImg, MediumText } from '../atoms/styles'

const MainProfile: React.FC<MainInfo> = (main) => {

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      paddingBottom: "3px"
    }}>
      <div style={{
          display: "flex",
          alignContent: "center",
          width: "100%",
          padding: "5px"
      }}>
        <IconImg src={`images/jobs/${main.job}.png`}/>
        <BigText style={{marginLeft: "10px", lineHeight: "40px"}}>
            {main.displayName ? main.displayName : main.nickname}
        </BigText>
      </div>
      <MediumText style={{lineHeight: "20px", color: "blue"}}>
          {main.server} / {main.job}
      </MediumText>
      <div style={{
          textAlign: "center",
          marginTop: "5px",
      }}>
        <table width="100%" style={{fontSize: "15px", fontWeight: 600}}>
          <thead style={{fontSize: '12px'}}>
            <tr>
              <th>전투</th>
              <th>아이템</th>
              <th>공격력</th>
              <th>체력</th>
            </tr>
          </thead>
          <tbody>            
            <tr>
              <td>Lv.{main.fightLv}</td>
              <td>Lv.{main.itemLv}</td>
              <td>{main.atk}</td>
              <td>{main.hp}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MainProfile