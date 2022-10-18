import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Modal, notification, Popconfirm, Upload, UploadProps } from 'antd';
import { RcFile } from 'antd/lib/upload';
import React, { useContext, useState } from 'react'
import { LoaContext } from '../contexts';
import { ColumnFlexDiv } from './styles';

function DataLoader() {
  const [fileList, setFileList] = useState([] as RcFile[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { profiles, setProfiles } = useContext(LoaContext)
    
  const showModal = () => {
      setIsModalOpen(true);
  };

  const handleOk = () => {
    notification.info({
      message: '업로드되었습니다. 잠시만 기다려 주세요.'
    })
    fileList.forEach((file) => {
      file.text().then((data) => {
        const json = JSON.parse(data) as CharInfo;
        setProfiles([...profiles, json])
      })
    })
    setIsModalOpen(false);
    setFileList([]);
  };

  const handleCancel = () => {
      setIsModalOpen(false);
  };

  const props: UploadProps = {
    beforeUpload: file => {
      const isPNG = file.type === 'text/plain';
      if (!isPNG) {
        message.error(`${file.name} is not a text file`);
      }
      setFileList(fileList.concat(file));
      return false;
    },
  };
  
  return (
    <>
      <Button onClick={showModal} shape="round">저장한 프로필 업로드</Button>
      <Modal open={isModalOpen} 
          okButtonProps={{ style: {display: 'none'} }}
          onCancel={handleCancel}
          title="Data Copy &#38; Load"           
      >
        <ColumnFlexDiv>
          <Upload {...props}>
            <Button style={{margin: "10px auto"}} icon={<UploadOutlined />}>txt 파일 업로드</Button>
          </Upload>
          <Popconfirm
              title="업로드할까요?"
              onConfirm={handleOk} 
              okText="Yes"
              cancelText="No"
          >
            <Button style={{margin: "30px auto"}} shape="round" size='large' type="primary">업로드</Button>
          </Popconfirm>
        </ColumnFlexDiv>
      </Modal>
    </>
  );
}

export default DataLoader