import { InfoCircleTwoTone } from '@ant-design/icons'
import { Tooltip } from 'antd'
import React, { useContext } from 'react'
import { getColor } from '../../func/function'
import { ColumnFlexDiv, IconImg, ItemFlexDiv, SmallText } from '../atoms/styles'
import { LoaContext } from '../contexts'

const SimpleEquipProfile: React.FC<SimpleEquipInfo> = (info) => {

    const upgradeCnt = info.weapon.name.replace(/[^\d]/g, '')
    const { isSecret, isDark } = useContext(LoaContext)


    return ( !info ? null : 
        <ColumnFlexDiv>
            <ItemFlexDiv>
                <IconImg src={info.weapon.src} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid ${info.weapon.color}`}}/>
                <div>
                    <SmallText style={{fontSize: "14px"}}>
                        {upgradeCnt.length > 0 ? upgradeCnt : 0}강&nbsp;&nbsp;&nbsp;Lv.{info.weapon.level}
                    </SmallText>
                    {isSecret ? null : <>
                        <br/>
                        <SmallText>
                            무기 품질 <b style={{color: getColor(info.weapon.quality, isDark)}}>{info.weapon.quality}</b>
                        </SmallText>                    
                    </>}
                </div>
            </ItemFlexDiv>
            <ItemFlexDiv style={{marginTop: "15px", marginBottom: "15px"}}>
                <IconImg src={info.defenseSrc} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid gray`}}/>
                <div>
                    <SmallText style={{fontSize: "14px"}}>
                        방컷 {info.defenseCut}
                    </SmallText>
                    <br/>                    
                    <SmallText style={{fontSize: "14px"}}>
                        {info.setLv}
                    </SmallText>
                    <br/>                    
                    <SmallText style={{fontSize: "14px"}}>
                        {info.setName}
                    </SmallText>
                    {isSecret ? null : <>
                        <br/>
                        <SmallText>
                            방어구 평균 품질 <b style={{color: getColor(info.defAvgQuality, isDark)}}>{info.defAvgQuality}</b>
                        </SmallText>
                    </>}
                </div>
            </ItemFlexDiv>
            <ItemFlexDiv>
                <IconImg src={info.accSrc.length > 0 ? info.accSrc : "images/empty.png"} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid gray`}}/>
                <div>
                    <SmallText style={{fontSize: "14px"}}>
                        악세 품질 <b style={{color: getColor(info.accAvgQuality, isDark)}}>{info.accAvgQuality}</b>&nbsp;&nbsp;
                        <Tooltip title={
                            <>
                                악세서리별로 가중치를 반영한 품질입니다. <br/>
                                목걸이는 10, 귀걸이는 3, 반지는 2의 가중치가 책정됩니다. <br/>
                                기준은 악세서리별 상승되는 최대 특성값입니다.
                            </>
                        }>
                            <InfoCircleTwoTone/>
                        </Tooltip>
                    </SmallText>
                </div>
            </ItemFlexDiv>
            {info.brace.name ? 
            <ItemFlexDiv>
                <IconImg src={info.brace.src} crossOrigin="anonymous" style={{border: `2px solid ${info.brace.color}`}}/>
                {isSecret ? <SmallText>??</SmallText> : <div style={{fontSize: "13px", wordBreak: "keep-all", display: "flex", alignItems: 'center'}}>
                    <SmallText>{info.brace.options.length > 0 ? info.brace.options.join(" ") : "특수옵션X"}</SmallText>
                </div>}
            </ItemFlexDiv> : null}
        </ColumnFlexDiv>
      )
}

export default SimpleEquipProfile