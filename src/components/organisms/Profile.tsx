import { useSensors, useSensor, KeyboardSensor, DndContext, closestCenter, DragEndEvent, MouseSensor } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import React, { useContext, useState } from 'react'
import ProfileCard from './ProfileCard';
import { LoaContext } from '../contexts';
import PartyProfile from '../molecules/PartyProfile';
import { Empty, Input } from 'antd';
import { getCharacterInfo } from '../../func/ScrapingService';
import Downloader from '../atoms/Downloader';
import DataLoader from '../atoms/DataLoader';
import { ColumnFlexDiv, MediumText, RowFlexDiv } from '../atoms/styles';

const { Search } = Input;

const Profile: React.FC = () => {

    const { setProfiles, addName, addProfile, profiles } = useContext(LoaContext)
    const [nickname, setNickname] = useState("");

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const searchNickName = () => {
        getCharacterInfo(nickname, Math.max(...profiles.map(a => a.id), 0) + 1)
        .then((val) => {
          if(val.mainInfo.job) {
            addProfile(val)
            addName(val.mainInfo.nickname);
            setNickname("")
          }
        })
    }

    function handleDragEnd(event: DragEndEvent) {
        const {active, over} = event;

        if (active.id !== over?.id) {
          const oldIndex = profiles.map(a => a.id).indexOf(parseInt(active.id.toString()));
          const newIndex = profiles.map(a => a.id).indexOf(parseInt(over?.id.toString() || '0'));
            
          setProfiles(arrayMove(profiles, oldIndex, newIndex));
        }
    }
    

    return (
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={profiles.map(a => a.id)}
            >
                <MediumText>Tip : 회색 박스 부분을 누르고 드래그해 보세요.</MediumText>
                <RowFlexDiv>
                    <Downloader tag='profile-wrapper'/>
                    <DataLoader/>
                </RowFlexDiv>
                <Search 
                    placeholder="닉네임을 입력하세요"
                    value={nickname} 
                    allowClear
                    style={{maxWidth: 250}}
                    onChange={(e) => setNickname(e.target.value)}
                    onSearch={searchNickName}
                />
                <RowFlexDiv style={{minHeight: '200px'}}>
                    { profiles.length > 0 ?
                        <ColumnFlexDiv id="profile-wrapper" style={{ maxWidth: `${600*Math.min(2, profiles.length)}px`}}>
                            <PartyProfile {...profiles[0]}/>
                            <div style={{
                                display: "grid",
                                gap: "2px",
                                gridTemplateColumns: "repeat(auto-fit, minmax(550px, auto))",
                            }}>
                                {profiles.map(a => a.id).map((id) => {
                                    const profile = profiles.find(a => a.id === id) || {} as CharInfo;
                                    return <ProfileCard key={id} {...profile}/>
                                })}
                            </div>
                        </ColumnFlexDiv>
                    : <Empty description={"프로필을 추가해 보세요."}/> }
                </RowFlexDiv> 
            </SortableContext>
        </DndContext>
    );
}

export default Profile