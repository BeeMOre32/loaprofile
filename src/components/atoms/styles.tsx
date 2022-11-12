import { Typography } from "antd";
import styled from "styled-components";


const { Text } = Typography;

export const ColumnFlexDiv = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`
export const RowFlexDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin: 10px auto;
`

export const BigText = styled(Text)`
    font-size: 20px;
    font-weight: 600;
`
export const MediumText = styled(Text)`
    font-size: 15px;
    font-weight: 600;
    margin: 2px;
`
export const SmallText = styled(Text)`
    font-size: 12px;
    font-weight: 600;
`

// 이미지 아이콘
export const IconImg = styled.img`
    width: 40px;
    height: 40px;
    margin-right: 5px;
`

// 장비 표시 용도의 Flexbox
export const ItemFlexDiv = styled.div`
    display: flex;
    align-items: center;
    text-align: left;
    margin: 2px;
    min-height: 40px;
`