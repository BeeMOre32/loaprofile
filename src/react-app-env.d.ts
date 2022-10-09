/// <reference types="react-scripts" />

// 캐릭터 종합 정보
interface CharInfo {
    id: number;
    mainInfo : MainInfo;
    collectInfo: BaseKeyVal[];
    equipInfo: EquipInfo[];
    statInfo: StatInfo;
    jewelInfo: JewelInfo[],
    card: string[];
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
    homeLv: number;     // 영지레벨
}

// 장비 정보
interface EquipInfo {
    name: string;
    set: string;
    setLv: number;     // 세트레벨
    quality: number;   // 품질
    src: string;       // 이미지 경로
    color: string;     // 이미지 색상
}

// 악세 정보
interface StatInfo {
    accessories: AccessaryInfo[];
    books: BaseKeyVal[];
    stats: BaseKeyVal[];
    imprinting: BaseKeyVal[];
    stone: StoneInfo;
    brace: BraceInfo;
}

interface AccessaryInfo {
    name: string;
    quality: number;   // 품질
    src: string;       // 이미지 경로
    color: string;     // 이미지 색상
}

// 돌 정보
interface StoneInfo {
    name: string;
    first: number;
    second: number;
    minus: number;
    src: string;       // 이미지 경로
    color: string;     // 이미지 색상
}

// 팔찌 정보
interface BraceInfo {
    name: string;
    options: string[];
    src: string;       // 이미지 경로
    color: string;     // 이미지 색상
}

// 보석 정보
interface JewelInfo {
    desc: string;
    level: number;
    src: string; 
    color: string;
}

interface BaseKeyVal {
    name: string;
    value: number;
}