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
import { Checkbox, Empty, Input } from 'antd';
import Downloader from '../atoms/Downloader';
import DataLoader from '../atoms/DataLoader';
import { ColumnFlexDiv, MediumText, RowFlexDiv } from '../atoms/styles';
import { getCharInfo } from '../../func/function';
import useWindowDimensions from '../../func/useWindowDimensions';
import { isMobile } from 'react-device-detect';
import SimpleProfileCard from './SimpleProfileCard';

const { Search } = Input;

const Profile: React.FC = () => {

    const { setProfiles, addProfile, profiles } = useContext(LoaContext)
    const [nickname, setNickname] = useState("")
    const [isSimple, setIsSimple] = useState(isMobile)
    const { width } = useWindowDimensions()

    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const colCount = Math.min(profiles.length, isSimple ? 3 : 2, Math.max(1, Math.floor(width / (isSimple ? 400 : 550))))
    
    const searchNickName = () => {
        getCharInfo(nickname, Math.max(...profiles.map(a => a.id), 0) + 1)
        .then((val) => {
          if(val.id) {
            addProfile(val)
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
                <MediumText>Tip : 위쪽 회색 박스를 눌러 드래그해 보세요.</MediumText>
                <RowFlexDiv>
                    <Downloader tag='profile-wrapper'/>
                    <DataLoader/>
                </RowFlexDiv>
                <RowFlexDiv>
                    <Search 
                        placeholder="닉네임"
                        value={nickname} 
                        allowClear
                        style={{maxWidth: 200}}
                        onChange={(e) => setNickname(e.target.value)}
                        onSearch={searchNickName}
                    />
                    <Checkbox 
                        defaultChecked={isSimple} 
                        onChange={() => setIsSimple(!isSimple)}
                        style={{margin: "5px", marginLeft: "20px"}}
                    >
                        간단 프로필
                    </Checkbox>
                </RowFlexDiv>
                <RowFlexDiv style={{minHeight: '200px'}}>
                    { profiles.length > 0 ?
                        <ColumnFlexDiv id="profile-wrapper" style={{
                            width: "95%",
                            maxWidth: `${colCount*(isSimple ? 400 : 550) + 50}px`
                        }}>
                            <div style={{
                                display: "grid",
                                gap: "2px",
                                justifyContent: width > 550 ? "center" : "normal",
                                gridTemplateColumns: `repeat(auto-fit)}`,
                            }}>
                                <div style={{
                                    minWidth: isSimple ? "400px" : "550px",
                                    gridColumn: `span ${colCount}`,
                                }}>
                                    <PartyProfile {...profiles[0]}/>
                                </div>
                                {profiles.map(a => a.id).map((id) => {
                                    const profile = profiles.find(a => a.id === id) || {} as CharInfo;
                                    return isSimple 
                                    ? <SimpleProfileCard key={id} {...profile}/>
                                    : <ProfileCard key={id} {...profile}/>
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