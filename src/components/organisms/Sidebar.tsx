import { SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Switch } from 'antd';
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { LoaContext } from '../contexts';
import { useThemeSwitcher } from "react-css-theme-switcher";

function Sidebar() {

    /**
     * @param visible: 사이드바의 표시 여부
     */
    const [visible, setVisible] = useState(false);
    const { isDark, toggleDark, isSecret, toggleSecret, isSimple, toggleSimple } = useContext(LoaContext);

    const { status } = useThemeSwitcher();
    // Avoid theme change flicker
    if (status === "loading") {
        return null;
    }

    return (
      <>
        <div 
            style={{
                display: "flex", 
                justifyContent: "center", 
                padding: "10px 20px 10px 20px", 
                backgroundColor: "#4169e1",
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99
            }}
        >
            <Button 
                style={{backgroundColor: "#303030", borderColor: "#303030"}}
                type="primary"
                shape='circle'
                size='large'
                icon={<SettingOutlined/>} 
                onClick={() => setVisible(true)}
            />            
            <div style={{flexGrow: 1, maxWidth: 1300, fontSize: 20, fontWeight: 600, lineHeight: "40px"}}>
                <Link to="/" style={{color: "white"}}>
                    Loa Profile
                </Link>
            </div>
        </div>
        <Drawer 
            title="설정"
            width={250}
            placement="left" 
            onClose={() => setVisible(false)} 
            visible={visible} 
            bodyStyle={{display: 'flex', flexDirection: 'column'}}
        >
            <div>
                <Switch checked={isDark} onChange={toggleDark}/>&nbsp;&nbsp;다크 모드
            </div>
            <br/>
            <div>
                <Switch checked={isSimple} onChange={toggleSimple}/>&nbsp;&nbsp;심플 명함
            </div>
            <br/>
            <div>
                <Switch checked={isSecret} onChange={toggleSecret}/>&nbsp;&nbsp;품질,팔찌 가리기
            </div>
            
            <br/><br/>


        </Drawer>
      </>
    );
}

export default Sidebar