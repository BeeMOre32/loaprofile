import { useSortable } from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import { Card, Col, Divider, Row } from 'antd';
import React from 'react'
import { BigText, MediumText } from '../atoms/styles';
import EquipProfile from '../molecules/EquipProfile';
import ImprintProfile from '../molecules/ImprintProfile';
import JewelProfile from '../molecules/JewelProfile';
import MainProfile from '../molecules/MainProfile';
import ProfileUtils from '../molecules/ProfileUtils';
import SimpleEquipProfile from '../molecules/SimpleEquipProfile';
import StatProfile from '../molecules/StatProfile';

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

  return (
    <div ref={setNodeRef} style={style} id={`profile-loa-${info.id}`}>
      <Card.Grid hoverable={false} style={{width: "100%", minWidth: '400px', height: '100%', backgroundColor: 'white',
       border: '1px solid lightgray', boxShadow: 'unset'}}>
        <Row gutter={[10,24]} align="middle">
          <Col span={24} {...attributes} {...listeners} style={{
            border: "1px solid lightgray"
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
          <Col span={6}>
            <BigText>카드</BigText>
          </Col>
          <Col span={18}>
            {info.card.map((val, idx) => (
              <MediumText key={idx}>{val}</MediumText>
            ))}
          </Col>
          <Col span={24}>
            <ProfileUtils id={info.id}/>
          </Col>
        </Row>
      </Card.Grid>
    </div>
  )
}

export default SimpleProfileCard