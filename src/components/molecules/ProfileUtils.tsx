import { DeleteOutlined, EditOutlined, VerticalAlignBottomOutlined } from "@ant-design/icons"
import { Button, Input, Modal, notification, Popconfirm, Popover, Tooltip } from "antd"
import React from "react"
import { useContext, useState } from "react"
import { saveImage } from "../../func/function"
import Downloader from "../atoms/Downloader"
import { LoaContext } from "../contexts"

const ProfileUtils: React.FC<{id : number}> = ({id}: {id : number}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { profiles, removeProfile, addProfile, setProfiles } = useContext(LoaContext)

    const [disname, setDisname] = useState("");

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const profile = profiles.find(a => a.id === id);
        if(profile) {
            profile.mainInfo.displayName = disname;
            setProfiles([profile, ...profiles.filter(a => a.id !== id)])
            setIsModalOpen(false);
            notification.info({
                message: '이름이 변경되었습니다.'
            });
        } else {
            notification.error({
                message: '프로필 정보 검색에 실패했습니다.'
            });
        }
    };

    const deleteList = () => {
        removeProfile(id)
        notification.info({
            message: '삭제되었습니다.'
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const downloadJson = () => {
        const profile = profiles.find(a => a.id === id);
        if(profile) {
            let fileName = `${profile.mainInfo.displayName ? profile.mainInfo.displayName : profile.mainInfo.nickname}.txt`;
            let output = JSON.stringify(profile);
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
            <Button type="primary" style={{margin: "2px"}} onClick={() => saveImage(`profile-loa-${id}`)}>
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
        <Tooltip title="이름 수정">
            <Button shape="round" onClick={showModal} style={{margin: "2px"}}>
                <EditOutlined />
            </Button>
        </Tooltip>
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
        <Modal title="이름 수정" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>닉네임 칸에 표시되는 이름을 바꿀 수 있어요.</p>
            <Input 
                placeholder="새 이름을 입력하세요."
                value={disname}
                style={{maxWidth: 300, margin: "20px auto"}}
                onChange={(e) => setDisname(e.target.value)}
            />
        </Modal>
      </div>
    )
  }
  
  export default React.memo(ProfileUtils)