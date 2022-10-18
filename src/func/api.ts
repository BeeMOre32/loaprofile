import { notification } from "antd"
import axios from "axios"

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