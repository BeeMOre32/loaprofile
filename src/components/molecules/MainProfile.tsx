import React from 'react'

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
          width: "100%"
      }}>
        <img style={{
          width: '30px', height: '30px', 
        }} src={`images/jobs/${main.job}.png`}/>
        <b style={{fontSize: "20px", marginRight: "20px", marginLeft: "10px", lineHeight: "30px"}}>
            {main.displayName ? main.displayName : main.nickname}
        </b>
        <b style={{fontSize: "14px", lineHeight: "30px"}}>
            {main.server} / {main.job}
        </b>
      </div>
      <div style={{
          textAlign: "center",
          marginTop: "15px",
          width: "100%"
      }}>
        <table width="100%" style={{fontSize: "16px"}}>
          <thead>
            <th>전투</th>
            <th>아이템</th>
            <th>공격력</th>
            <th>체력</th>
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