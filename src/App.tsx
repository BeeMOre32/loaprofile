import { Routes, Route } from 'react-router-dom';
import { ColumnFlexDiv } from './components/atoms/styles';
import Sidebar from './components/organisms/Sidebar';
import ProfilePage from './components/pages/ProfilePage';

function App() {

  return (
    <ColumnFlexDiv>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<ProfilePage />}/>
        </Routes>
    </ColumnFlexDiv>
  );
}

export default App;
