import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Card, Col, Divider, Row } from 'antd';
import React, { useState, useContext } from 'react'
import { BigText, IconImg, MediumText } from '../atoms/styles';
import { LoaContext } from '../contexts';
import ImprintProfile from '../molecules/ImprintProfile';
import JewelProfile from '../molecules/JewelProfile';
import MainProfile from '../molecules/MainProfile';
import ProfileUtils from '../molecules/ProfileUtils';
import SimpleEquipProfile from '../molecules/SimpleEquipProfile';
import SkillProfile from '../molecules/SkillProfile';
import StatProfile from '../molecules/StatProfile';
import UserIdentity from '../molecules/UserIdentity';

const SimpleProfileCard : React.FC<CharInfo> = (info) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({
      id: info.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      zIndex : isDragging ? "100" : "auto"
    };
  
    const [editableStr, setEditableStr] = useState(
      info.mainInfo.displayName ? info.mainInfo.displayName : info.mainInfo.nickname
    );

    const { isDark } = useContext(LoaContext)

  return (
    <div ref={setNodeRef} style={style} id={`profile-loa-${info.id}`}>
      <Card.Grid hoverable={false} style={{width: "100%", minWidth: '400px', height: '100%', 
       border: '1px solid lightgray', boxShadow: 'unset'}}>
        <Row gutter={[10,24]} align="middle">
          <Col span={24} style={{
            position: "relative",
            display: "flex",
            alignItems: "left"
          }}>
            <IconImg src={`images/jobs/${info.mainInfo.job}.png`} style={{
              backgroundColor: isDark ? "lightgray" : undefined
            }}/>
            <BigText style={{marginLeft: "10px", lineHeight: "40px"}} 
              editable={info.isSafe ? {
                onChange: setEditableStr,
                tooltip: "표시할 이름 수정",
                enterIcon: null
              } : false}
            >
                {editableStr}
            </BigText>
            <UserIdentity isSafe={info.isSafe} reason={info.reason}/>
          </Col>
          <Col span={24} {...attributes} {...listeners} style={{
            border: "2px solid lightgray",
          }}>
            <MainProfile {...info.mainInfo}/>
          </Col>
          <Col span={14}>
            <SimpleEquipProfile {...info.simpleEquipInfo}/>
          </Col>
          <Col span={10}  style={{
            border: "1px solid lightgray"
          }}>
            <StatProfile stats={info.statInfo}/>
            <Divider style={{width: "100%", backgroundColor: "lightgray", margin: "10px 0 10px 0"}}/>
            <ImprintProfile imprinting={info.imprintingInfo}/>
          </Col>
          <Col span={24}>
            <JewelProfile jewels={info.jewelInfo} isSimple={true}/>
          </Col>          
          <Col span={24}>
            <SkillProfile skills={info.skillInfo} isSimple={true}/>
          </Col>
          <Col span={6}>
            <BigText>카드</BigText>
          </Col>
          <Col span={18}>
            {info.card.map((val, idx) => (
              <>
                {idx !== 0 ? <br/> : null}
                <MediumText key={idx}>{val}</MediumText>
              </>
            ))}
          </Col>
          <Col span={24}>
            <ProfileUtils id={info.id} isSafe={info.isSafe}/>
          </Col>
        </Row>
      </Card.Grid>
    </div>
  )
}

export default SimpleProfileCard