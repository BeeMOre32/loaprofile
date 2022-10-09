import { Button } from 'antd'
import React from 'react'
import domtoimage from 'dom-to-image';

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

    const handleSaveClick = () => {
        const element = document.getElementById(tag)
        if (!element) return;
        domtoimage.toPng(element, { quality: 1 })
            .then(function (dataUrl) {
               var link = document.createElement('a');
               link.download = `c${Date.now()}.png`;
               link.href = dataUrl;
               link.click();
           });
    }

    return (
        <Button shape='round' style={{ height: 35, width: 110, fontSize: "1rem", fontWeight: 600, margin: 5}} type="primary" danger onClick={handleSaveClick}>Download</Button>
    )
}

export default Downloader
