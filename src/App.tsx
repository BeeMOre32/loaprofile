import { Spin } from 'antd';
import React, { useEffect, useContext, useState } from 'react';
import { LoaContext } from './components/contexts';
import Profile from './components/organisms/Profile';
import { getCharacterInfo } from './func/ScrapingService';


function App() {

  const { names, setProfiles } = useContext(LoaContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let infos = [] as Promise<CharInfo>[];
    names.forEach((name, idx) => {
      infos.push(getCharacterInfo(name, idx+1))
    })
    Promise.all(infos).then(arr => {
      setProfiles(arr);
      setLoading(false)
    });
  }, [])

  return (
    <div style={{
      margin: "20px auto",
      display: "flex",
      flexDirection: 'column',
      textAlign: "center",
    }}>
      <h1>Lost Ark Profile</h1>
      {loading ? <Spin tip="Loading..." style={{marginTop: "30px"}}/> : <Profile/>}
    </div>
  );
}

export default App;
