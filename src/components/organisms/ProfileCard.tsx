import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Card, Col, Row } from 'antd';
import React from 'react'
import { BigText, MediumText } from '../atoms/styles';
import AccProfile from '../molecules/AccProfile';
import EquipProfile from '../molecules/EquipProfile';
import ImprintProfile from '../molecules/ImprintProfile';
import JewelProfile from '../molecules/JewelProfile';
import MainProfile from '../molecules/MainProfile';
import ProfileUtils from '../molecules/ProfileUtils';
import StatProfile from '../molecules/StatProfile';

const ProfileCard : React.FC<CharInfo> = (info) => {

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

  return (
    <div ref={setNodeRef} style={style} id={`profile-loa-${info.id}`}>
      <Card.Grid hoverable={false} style={{width: "100%", height: '100%', backgroundColor: 'white',
       border: '1px solid lightgray', boxShadow: 'unset'}}>
        <Row gutter={[10,24]} align="middle">
          <Col span={24} {...attributes} {...listeners} style={{
            border: "1px solid lightgray"
          }}>
            <MainProfile {...info.mainInfo}/>
          </Col>
          <Col span={12}>
            <EquipProfile {...info.equipInfo}/>
          </Col>
          <Col span={6}>
            <AccProfile {...info.subEquipInfo}/>
          </Col>
          <Col span={6}>
            <StatProfile stats={info.statInfo}/>
            <ImprintProfile imprinting={info.imprintingInfo}/>
          </Col>
          <Col span={24}>
            <JewelProfile jewels={info.jewelInfo}/>
          </Col>
          <Col span={16}>
            <BigText>카드</BigText>
            {info.card.map((val, idx) => (
              <MediumText key={idx}>{val}</MediumText>
            ))}
          </Col>
          <Col span={8}>
            <ProfileUtils id={info.id}/>
          </Col>
        </Row>
      </Card.Grid>
    </div>
  )
}

export default ProfileCard