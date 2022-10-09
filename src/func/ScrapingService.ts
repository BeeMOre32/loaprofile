import axios from 'axios'
import * as cheerio from 'cheerio';
import React from 'react';
import { effectOptions, intRegex, tagRegex } from './constant';

export const getCharacterInfo = async (name: string, id: number) => {
    const html = await axios.get(`${process.env.REACT_APP_LOA_HOST}/html/char/${encodeURI(name)}`);

    const selector: cheerio.CheerioAPI = cheerio.load(html.data);

    const charInfo = {} as CharInfo;

    const job = selector(".profile-character-info__img").attr("alt") as string;
    if (job.length <= 0) return charInfo;

    const varScripts: any = selector('script').filter((_, a:any) => a.children[0]?.data.indexOf("var _memberNo") > -1);
    const vars = varScripts[0].children[0].data.split("\n\t\t").slice(1,4);

    const collectHtml = await axios.post(`${process.env.REACT_APP_LOA_HOST}/html/collection`, {
        memberNo: vars[0].split("= '")[1].replace("';",""),
        pcId: vars[1].split("= '")[1].replace("';",""),
        worldNo: vars[2].split("= '")[1].replace("';",""),
    });
    const collectSelector: cheerio.CheerioAPI = cheerio.load(collectHtml.data);

    const profileScripts: any = selector('script').filter((_, a:any) => a.children[0]?.data.indexOf("$.Profile =") > -1);
    const dataJson = JSON.parse(
        profileScripts[0].children[0].data.replace("$.Profile =", "").replace(";", "")
    )

    charInfo.mainInfo = getMainInfo(selector);
    charInfo.collectInfo = getCollectInfo(collectSelector);
    charInfo.equipInfo = getEquipInfo(dataJson);
    charInfo.statInfo = getStatInfo(dataJson, selector);
    charInfo.jewelInfo = getJewelInfo(dataJson);
    charInfo.card = getCard(dataJson);
    charInfo.id = id;

    return charInfo;
}

function getMainInfo(selector: cheerio.CheerioAPI): MainInfo {
    const info = {} as MainInfo;
    info.server = selector(".profile-character-info__server").text().replace("@", "");
    info.nickname = selector(".profile-character-info__name").text().replace("@", "");
    info.job = selector(".profile-character-info__img").attr("alt") as string;
    
    const basicStatData = selector(".profile-ability-basic").find("span")
        .map((_, span: any) => span.children[0].data);
    info.atk = parseInt(basicStatData[1]);
    info.hp = parseInt(basicStatData[3]);

    info.fightLv = parseInt(selector(".profile-character-info__lv").text().replace(intRegex, ""));
    info.itemLv = parseFloat(selector(".level-info2__expedition").text()
        .replace("장착 아이템 레벨Lv.", "").replace(",", ""));
    info.partyLv = parseInt(selector(".level-info__expedition").text().replace(intRegex, ""));

    return info;
}

function getCollectInfo(selector: cheerio.CheerioAPI): BaseKeyVal[] {
    const info = [] as BaseKeyVal[];

    const collections = selector(".lui-tab__menu").find("a")

    collections.each((_, a: any) => {
        const element = {} as BaseKeyVal;
        element.name = a.children[0].data.trim();
        element.value = parseInt(a.children[1].children[0].data.replace(intRegex, ""));

        info.push(element);
    })

    return info;
}

function getEquipInfo(json: any): EquipInfo[] {
    const info = [] as EquipInfo[];
    const equipments = Object.values(json["Equip"]).filter((a: any) => a.Element_001?.value.leftStr2.includes("아이템 레벨"))


    equipments.forEach((a: any) => {
        const element = {} as EquipInfo;

        element.name = a.Element_000?.value.replace(tagRegex, "");

        const setInfo: any = Object.values(a).filter((b: any) => b.type === "ItemPartBox")[2]

        element.set = setInfo.value.Element_001?.replace(tagRegex, "").split(" Lv.")[0];
        element.setLv = parseInt(setInfo.value.Element_001?.replace(tagRegex, "").split(" Lv.")[1]);
        if(element.set.includes("동일한")) {
            element.set = "에스더"
            element.setLv = 0
        }
        element.quality = a.Element_001?.value.qualityValue;
        element.src = `https://cdn-lostark.game.onstove.com/${a.Element_001?.value.slotData.iconPath}`;
        element.color = a.Element_000?.value.split("'")[3];

        info.push(element);
    })

    return info;
}

function getStatInfo(json: any, selector: cheerio.CheerioAPI): StatInfo {
    const info = {} as StatInfo;

    
    const accArr = [] as AccessaryInfo[];
    const accs = Object.values(json["Equip"]).filter((a: any) => a.Element_006?.value.Element_000?.includes("무작위 각인")
    && !a.Element_005?.value.Element_000?.includes("세공"))
    accs.forEach((a: any) => {
        const element = {} as AccessaryInfo;

        element.name = a.Element_000?.value.replace(tagRegex, "");
        element.quality = a.Element_001?.value.qualityValue;
        element.src = `https://cdn-lostark.game.onstove.com/${a.Element_001?.value.slotData.iconPath}`;
        element.color = a.Element_000?.value.split("'")[3];

        accArr.push(element);
    })

    const bookArr = [] as BaseKeyVal[];
    Object.values(json["Engrave"]).forEach((a: any) => {
        const element = {} as BaseKeyVal;

        element.name = a.Element_000?.value
        element.value = parseInt(a.Element_001?.value.leftText.replace(tagRegex, "").replace(intRegex, ""))

        bookArr.push(element);
    })

    const brace = {} as BraceInfo;
    const braceData: any = Object.values(json["Equip"]).find((a: any) => a.Element_000?.value.includes("팔찌"))

    if (braceData) {
        brace.name = braceData.Element_000?.value.replace(tagRegex, ""); 
        brace.src = `https://cdn-lostark.game.onstove.com/${braceData.Element_001?.value.slotData.iconPath}`; 
        brace.color = braceData.Element_000?.value.split("'")[3];
        const optionArr = braceData.Element_004?.value.Element_001.split("<BR>")
        .map((a: any) => a.replace(tagRegex, ""))
        const addOptions = [] as string[];
        effectOptions.forEach((eff) => {
            if(optionArr.filter((a: any) => a.includes(eff)).length > 0) addOptions.push(eff);
        })
        brace.options = addOptions;
    }

    const stone = {} as StoneInfo;
    const stoneData: any = Object.values(json["Equip"]).find((a: any) => a.Element_006?.value.Element_000?.includes("무작위 각인")
    && a.Element_005?.value.Element_000?.includes("세공"))

    if (stoneData) {
        stone.name = stoneData.Element_000?.value.replace(tagRegex, "");
        stone.src = `https://cdn-lostark.game.onstove.com/${stoneData.Element_001?.value.slotData.iconPath}`; 
        stone.color = stoneData.Element_000?.value.split("'")[3];
        const optionArr = stoneData.Element_006?.value.Element_001.split("<BR>")
        .map((a: any) => a.replace(tagRegex, "").replace(intRegex, ""))
        stone.first = parseInt(optionArr[0])
        stone.second = parseInt(optionArr[1])
        stone.minus = parseInt(optionArr[2])
    }

    const statArr = [] as BaseKeyVal[];
    const fightStatData = selector(".profile-ability-battle").find("span")
        .map((_, span: any) => span.children[0].data);
    for (let i=0; i < fightStatData.length; i += 2) {
        const element = {} as BaseKeyVal;

        element.name = fightStatData[i]
        element.value = parseInt(fightStatData[i+1])

        statArr.push(element);
    }

    statArr.sort((a,b) => b.value - a.value)

    const impArr = [] as BaseKeyVal[];
    const impData = selector(".profile-ability-engrave").find("span")
        .map((_, span: any) => span.children[0].data);
    impData.each ((_, a: any) => {
        const element = {} as BaseKeyVal;

        element.name = a.split("Lv.")[0].trim()
        element.value = parseInt(a.split("Lv.")[1].trim())

        impArr.push(element);
    })

    info.accessories = accArr;
    info.books = bookArr;
    info.brace = brace;
    info.stats = statArr;
    info.imprinting = impArr;
    info.stone = stone;


    return info;
}

function getJewelInfo(json: any): JewelInfo[] {
    const info = [] as JewelInfo[];
    const jewels = Object.values(json["Equip"]).filter((a: any) => a.Element_000?.value.includes("보석"))

    jewels.forEach((a: any) => {
        const element = {} as JewelInfo;

        element.level = parseInt(a.Element_001?.value.slotData.rtString.replace("Lv.", ""));
        element.src = `https://cdn-lostark.game.onstove.com/${a.Element_001?.value.slotData.iconPath}`;
        element.desc = a.Element_004?.value.Element_001?.replace(tagRegex, "")
        element.color = a.Element_000?.value.split("'")[3];

        info.push(element);
    })

    info.sort((a,b) => b.level - a.level)

    return info;
}


function getCard(json: any): string[] {
    const newCards: string[] = Object.values(json.CardSet)
        .map((a: any) => {
            const cards: any = Object.values(a).filter((a: any) => a?.title).reverse();
            const target = cards[0].title.replace("합계","");
            return target.includes("각성") 
                ? target.split(' ').filter((a: any) => !a.includes("세트")).join(" ")
                : target
        }).map((a: string) => a.replace("각성", "각"));

    return newCards;
}

