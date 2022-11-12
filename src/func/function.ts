import { notification } from "antd"
import axios from "axios"
import html2canvas from "html2canvas"

export const getCharInfo = async (name: string, id: number) => {
    const url = `${process.env.REACT_APP_LOA_HOST}/v2/char/${encodeURI(name)}`
    
    try {
        const res = await axios.get(url)

        if (res.status === 200) {
            const info = res.data as CharInfo
            info.id = id
            return info
        } 
    } catch (err: any) {
        notification.error({
            message: "해당하는 캐릭터가 없거나, 인게임 점검 중입니다.",
            description: name
        })
    }
        
    return {} as CharInfo
}

export const getColor = (quality: number, isDark=false) => {
    if (isDark) return undefined
    if (quality === 100) return "#FF5E00"
    else if (quality >= 90) return "#FF00DD"
    else if (quality >= 70) return "#0054FF"
    else return undefined 
}

export const saveImage = (tag: string, isDark=false, displayName = Date.now().toString()) => {
    const element = document.getElementById(tag)
    if (!element) return;
    html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: isDark ? "#303030" : "white",
        ignoreElements: (element) => element.className === "profile-buttons"
    }).then((canvas) => {
        const dataUrl = canvas.toDataURL()
        const link = document.createElement('a');
        link.download = `${displayName}.png`;
        link.href = dataUrl;
        link.click();
    })
}