import { CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React from 'react'
 

const UserIdentity: React.FC<{reason : string, isSafe: boolean}> 
    = ({reason, isSafe}: {reason : string, isSafe: boolean}) => {
  return (
    <Tooltip title={reason}>
        <a style={{
            position: "absolute",
            top: 3,
            right: 3
        }}>
            {isSafe ?
                <CheckCircleTwoTone style={{
                    fontSize:"30px"
                }} twoToneColor="#32CD32"/> 
            : <CloseCircleTwoTone style={{
                fontSize:"30px"
            }} twoToneColor="#FF5733"/>}
        </a>
    </Tooltip>
  )
}

export default UserIdentity