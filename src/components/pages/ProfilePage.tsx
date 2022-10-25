import { Spin } from 'antd';
import { useEffect, useContext, useState } from 'react';
import { getCharInfo } from '../../func/function';
import { LoaContext } from '../contexts';
import Profile from '../organisms/Profile';


function ProfilePage() {
    
  const { names, setProfiles } = useContext(LoaContext)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let infos = [] as Promise<CharInfo>[];
    names.forEach((name, idx) => {
      if(name.length > 0) infos.push(getCharInfo(name, idx+1))
    })
    Promise.all(infos).then(arr => {
      setProfiles(arr.filter(a => a.id));
      setLoading(false)
    });
  }, [])

  return (
    <div style={{width: "100%"}}>
      {loading ? <Spin tip="Loading..." style={{marginTop: "30px"}}/> : <Profile/>}
    </div>
  )
}

export default ProfilePage