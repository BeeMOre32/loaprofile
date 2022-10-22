import React from 'react'
import { getColor } from '../../func/function'
import { ColumnFlexDiv, IconImg, ItemFlexDiv, SmallText } from '../atoms/styles'

const SimpleEquipProfile: React.FC<SimpleEquipInfo> = (info) => {

    const upgradeCnt = info.weapon.name.replace(/[^\d]/g, '')

    return ( !info ? null : 
        <ColumnFlexDiv>
            <ItemFlexDiv>
                <IconImg src={info.weapon.src} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid ${info.weapon.color}`}}/>
                <div>
                    <SmallText style={{fontSize: "14px"}}>
                        {upgradeCnt.length > 0 ? upgradeCnt : 0}강&nbsp;&nbsp;&nbsp;Lv.{info.weapon.level}
                    </SmallText>
                    <br/>
                    <SmallText>
                        무기 품질 <b style={{color: getColor(info.weapon.quality)}}>{info.weapon.quality}</b>
                    </SmallText>
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
                    <br/>
                    <SmallText>
                        방어구 평균 품질 <b style={{color: getColor(info.defAvgQuality)}}>{info.defAvgQuality}</b>
                    </SmallText>
                </div>
            </ItemFlexDiv>
            <ItemFlexDiv>
                <IconImg src={info.accSrc} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid gray`}}/>
                <div>
                    <SmallText style={{fontSize: "14px"}}>
                        악세 평균 품질 <b style={{color: getColor(info.accAvgQuality)}}>{info.accAvgQuality}</b>
                    </SmallText>
                </div>
            </ItemFlexDiv>
            {info.brace.name ? 
            <ItemFlexDiv>
                <IconImg src={info.brace.src} crossOrigin="anonymous" style={{border: `2px solid ${info.brace.color}`}}/>
                <div style={{fontSize: "13px", wordBreak: "keep-all", display: "flex", alignItems: 'center'}}>
                    <b>{info.brace.options.length > 0 ? info.brace.options.join(" ") : "특수옵션X"}</b>
                </div>
            </ItemFlexDiv> : null}
        </ColumnFlexDiv>
      )
}

export default SimpleEquipProfile