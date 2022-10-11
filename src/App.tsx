import { Spin } from 'antd';
import { useEffect, useContext, useState } from 'react';
import { BigText, ColumnFlexDiv } from './components/atoms/styles';
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
    <ColumnFlexDiv>
      <BigText style={{fontSize: '25px', marginTop: "5px"}}>Lost Ark Profile</BigText>
      {loading ? <Spin tip="Loading..." style={{marginTop: "30px"}}/> : <Profile/>}
    </ColumnFlexDiv>
  );
}

export default App;
