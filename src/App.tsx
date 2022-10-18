import { Radio } from 'antd';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BigText, ColumnFlexDiv } from './components/atoms/styles';
import ProfilePage from './components/pages/ProfilePage';
import SearchPage from './components/pages/SearchPage';

function App() {

  const location = useLocation()

  return (
    <ColumnFlexDiv>
        <BigText style={{fontSize: '25px', margin: "20px"}}>Lost Ark Profile</BigText>
        <Radio.Group value={location.pathname} style={{marginBottom: "40px"}}>
          <Link to="/">
            <Radio.Button value="/">프로필</Radio.Button>
          </Link>
          <Link to="/search">
            <Radio.Button value="/search">군장검사</Radio.Button>
          </Link>
        </Radio.Group>
        <Routes>
          <Route path="/" element={<ProfilePage />}/>
					<Route path="/search" element={<SearchPage />}/>
        </Routes>
    </ColumnFlexDiv>
  );
}

export default App;
