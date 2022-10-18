import { notification } from "antd"
import axios from "axios"
import html2canvas from "html2canvas"

export const getCharInfo = async (name: string, id: number) => {
    const url = `${process.env.REACT_APP_LOA_HOST}/v2/char/${encodeURI(name)}`
    const res = await axios.get(url)

    if (res.status === 200) {
        const info = res.data as CharInfo
        info.id = id
        return info
    } else {
        notification.error({
            message: res.data.detail,
            description: name
        })
        return {} as CharInfo
    }
}

export const getColor = (quality: number) => {
    if (quality === 100) return "#FF5E00"
    else if (quality >= 90) return "#FF00DD"
    else if (quality >= 70) return "#0054FF"
    else return "black" 
}

export const saveImage = (tag: string, displayName = Date.now().toString()) => {
    const element = document.getElementById(tag)
    if (!element) return;
    html2canvas(element, {
        allowTaint: true,
        useCORS: true,
        ignoreElements: (element) => element.className === "profile-buttons"
    }).then((canvas) => {
        const dataUrl = canvas.toDataURL()
        const link = document.createElement('a');
        link.download = `${displayName}.png`;
        link.href = dataUrl;
        link.click();
    })
}