import React from 'react'
import { getColor } from '../../func/function'
import { BigText, ColumnFlexDiv, IconImg, ItemFlexDiv, MediumText, SmallText } from '../atoms/styles'

const SimpleEquipProfile: React.FC<SimpleEquipInfo> = (info) => {

    return ( !info ? null : 
        <ColumnFlexDiv>
            <ItemFlexDiv>
                <IconImg src={info.weapon.src} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid ${info.weapon.color}`}}/>
                <div>
                    <SmallText>
                        {info.weapon.name}
                    </SmallText>
                    <br/>
                    <SmallText>
                        품질 <b style={{color: getColor(info.weapon.quality)}}>{info.weapon.quality}</b>
                    </SmallText>
                </div>
            </ItemFlexDiv>
            <ItemFlexDiv style={{marginTop: "15px", marginBottom: "15px"}}>
                <IconImg src={info.defenseSrc} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid gray`}}/>
                <div>
                    <SmallText>
                        방컷 {info.defenseCut}
                    </SmallText>
                    <br/>                    
                    <SmallText>
                        {info.setLv}
                    </SmallText>
                    <br/>                    
                    <SmallText>
                        {info.setName}
                    </SmallText>
                </div>
            </ItemFlexDiv>
            <ItemFlexDiv>
                <IconImg src={info.accSrc} crossOrigin="anonymous" style={{marginRight: "5px", border: `2px solid gray`}}/>
                <div>
                    <SmallText>
                        평균 품질 <b style={{color: getColor(info.accAvgQuality)}}>{info.accAvgQuality}</b>
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