import { DeleteOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons"
import { Button, notification, Popconfirm, Popover } from "antd"
import React from "react"
import { useContext } from "react"
import { saveImage } from "../../func/function"
import { LoaContext } from "../contexts"

const ProfileUtils: React.FC<{id : number, isSafe: boolean}> = ({id, isSafe}: {id : number, isSafe: boolean}) => {

    const { profiles, removeProfile, isDark } = useContext(LoaContext)

    const deleteList = () => {
        removeProfile(id)
        notification.info({
            message: '삭제되었습니다.'
        });
    };

    const downloadJson = () => {
        const profile = profiles.find(a => a.id === id);
        if(profile) {
            let fileName = `${profile.mainInfo.displayName ? profile.mainInfo.displayName : profile.mainInfo.nickname}.txt`;
            let output = JSON.stringify(profile, null, 2);
            const element = document.createElement('a');
            const file = new Blob([output], {
              type: 'text/plain',
            });
            element.href = URL.createObjectURL(file);
            element.download = fileName;
            document.body.appendChild(element); // FireFox
            element.click();
        } else {
            notification.error({
                message: '프로필 정보 검색에 실패했습니다.'
            });
        }
    }

    const downloadContent = (
        <>
            <Button type="primary" style={{margin: "2px"}} onClick={() => saveImage(`profile-loa-${id}`, isDark)}>
                이미지
            </Button>
            <Button type="primary" style={{margin: "2px"}} onClick={downloadJson}>
                데이터
            </Button>
        </>
    )

    return (
      <div className="profile-buttons"
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            margin: "0 auto"
      }}>
        <Popover placement="topRight" title="다운로드" content={downloadContent} trigger="click">
            <Button type="primary" shape="round" style={{margin: "2px"}}>
                <VerticalAlignBottomOutlined />
            </Button>
        </Popover>
        <Popconfirm
            title="정말 삭제할까요?"
            onConfirm={deleteList}
            okText="Yes"
            cancelText="No"
        >
            <Button type="primary" shape="round" danger>
                <DeleteOutlined />
            </Button>
        </Popconfirm>
      </div>
    )
  }
  
  export default React.memo(ProfileUtils)