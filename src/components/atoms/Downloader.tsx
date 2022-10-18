import { Button } from 'antd'
import React from 'react'
import { saveImage } from '../../func/function';

interface DownloaderProps {
    tag: string;
}

/**
 * Downloader
 * 
 * 특정 태그가 달린 div 영역을 이미지로 다운로드할 수 있게 합니다.
 * 일부 기기에서 동작하지 않을 수도 있습니다.
 * 
 * @param tag
 */
const Downloader: React.FC<DownloaderProps> = ({ tag }) => {

    return (
        <Button 
            shape='round' 
            style={{ height: 35, fontSize: "1rem", margin: 5}} 
            type="primary" 
            danger 
            onClick={() => saveImage(tag)}
        >
            이미지 다운
        </Button>
    )
}

export default Downloader
