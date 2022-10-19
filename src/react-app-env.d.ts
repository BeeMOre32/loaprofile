/// <reference types="react-scripts" />

// 캐릭터 종합 정보
interface CharInfo {
    id: number;
    mainInfo : MainInfo;
    collectInfo: BaseKeyVal[];
    statInfo: BaseKeyVal[];
    imprintingInfo: BaseKeyVal[];
    jewelInfo: JewelInfo[],
    card: string[];

    equipInfo: MainEquipInfo;
    subEquipInfo: SubEquipInfo;
    simpleEquipInfo: SimpleEquipInfo;
}

// 메인 정보
interface MainInfo {
    server: string;
    job: string;
    nickname: string;
    displayName: string;  // 따로 표시할 이름

    atk: number;
    hp: number;
    fightLv: number;    // 전투레벨
    itemLv: number;     // 아이템레벨
    partyLv: number;    // 원대레벨
}

interface BaseKeyVal {
    name: string;
    value: number;
}

interface ItemInfo {
    src: string;
    color: string;
}

// 악세 정보
interface AccessaryInfo extends ItemInfo {
    name: string;
    quality: number;   // 품질
}

// 팔찌 정보
interface BraceInfo extends ItemInfo {
    name: string;
    options: string[];
}

// 보석 정보
interface JewelInfo extends ItemInfo {
    name: string;
    desc: string;
    level: number;
}

// 돌 정보
interface ClothesInfo extends ItemInfo {
    name: string;
    quality: number; 
    level: number;
    set: string;
    setLv: number;
}

interface MainEquipInfo {
    defense: ClothesInfo[];
    weapon: ClothesInfo;
}

interface SubEquipInfo {
    accessory: AccessaryInfo[],
    brace: BraceInfo
}

interface SimpleEquipInfo {
    defenseCut: number;
    weapon: ClothesInfo;
    setName: string;
    setLv: string;
    accAvgQuality: number;
    brace: BraceInfo;
    accSrc: string;
    defenseSrc: string;
}