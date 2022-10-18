import React from 'react'
import { BigText, MediumText } from '../atoms/styles'

const MainProfile: React.FC<MainInfo> = (main) => {

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr",
      paddingBottom: "5px"
    }}>
      <div style={{
          display: "flex",
          alignContent: "center",
          width: "100%",
          padding: "2px"
      }}>
        <img style={{
          width: '30px', height: '30px', 
        }} src={`images/jobs/${main.job}.png`}/>
        <BigText style={{marginRight: "20px", marginLeft: "10px", lineHeight: "30px"}}>
            {main.displayName ? main.displayName : main.nickname}
        </BigText>
        <MediumText style={{lineHeight: "30px"}}>
            {main.server} / {main.job}
        </MediumText>
      </div>
      <div style={{
          textAlign: "center",
          marginTop: "10px",
          width: "100%"
      }}>
        <table width="100%" style={{fontSize: "16px"}}>
          <thead>
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