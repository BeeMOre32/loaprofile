import { Avatar, Col, Row } from 'antd'
import React from 'react'
import { IconImg, ItemFlexDiv, SmallText } from '../atoms/styles'

interface SkillProps {
    skills: SkillInfo
    isSimple: boolean
}

const SkillProfile: React.FC<SkillProps> = ({skills, isSimple}: SkillProps) => {

    const customSkills = Array.from(new Set(skills.tripodList.map(a => a.originSkill)))

    const getColor = (tripod: TripodInfo) => {
        if (tripod.isMax) return "#4EE44E"
        else if (tripod.level === 4) return "#FFC300"
        else return "#FF7276"
    }

    return (
        <ItemFlexDiv style={{
            justifyContent: "center", 
            flexWrap: "wrap", 
            maxWidth: isSimple ? "390px" : "540px",
            margin: "2px auto",
            textAlign: "center"
        }}>
            <table width="100%" style={{fontSize: "15px", fontWeight: 600}}>
                <thead style={{fontSize: '12px'}}>
                    <tr>
                        <th style={{width: "33%"}}>스킬 포인트</th>
                        <th style={{width: "33%"}}>Lv5 트포</th>
                        <th style={{width: "33%"}}>Lv4 트포</th>
                    </tr>
                </thead>
                <tbody>            
                    <tr style={{fontWeight: "bold"}}>
                        <td>{skills.skillPt} / {skills.maxSkillPt}</td>
                        <td>{skills.lv5Tripod} / {skills.maxTripod}</td>
                        <td>{skills.lv4Tripod} / {skills.maxTripod}</td>
                    </tr>
                </tbody>
            </table>
            {customSkills.length > 0 && !isSimple ? (
                <Row style={{marginTop: '5px'}}>
                    {customSkills.map((c, idx) => {
                        const filtered = skills.tripodList.filter(a => a.originSkill === c)
                        return (                        
                            <Col span={12} key={idx} style={{
                                display: 'flex', 
                                alignItems: "center",
                                border: "1px solid lightgray",
                                boxSizing: "border-box"
                            }}>
                                <div style={{width: '100px'}}>
                                    <IconImg src={filtered[0].src}/>
                                    <br/>
                                    <SmallText>{filtered[0].originSkill}</SmallText>
                                </div>                                    
                                <div>                                    
                                    {filtered.map((tripod, idx2) => (
                                        <div key={"tripod" + idx2} style={{display: 'flex', margin: "2px"}}>
                                            <Avatar 
                                                size='small'
                                                shape='square' 
                                                style={{
                                                    marginRight: "5px",
                                                    fontWeight: "bold",
                                                    backgroundColor: getColor(tripod)
                                                }
                                            }>{tripod.isMax ? "M" : tripod.level}</Avatar>
                                            {tripod.name}
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        )
                    })}
                </Row>   
            ) : null}            
            
        </ItemFlexDiv>
    )
}

export default SkillProfile