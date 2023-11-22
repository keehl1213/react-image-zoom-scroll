type Language = 'zh-TW' | 'zh-CN' | 'en-US';

type UserInfoProps = {
    auth_status: string;
    create_time: string;
    first_name: string;
    group_id: number;
    group_name: string;
    id: number;
    is_active: boolean;
    last_name: string;
    organization: number;
    organization_group_id: number;
    organization_group_name: string;
    remarks: string;
    update_time: string;
    username: string;
};

declare module 'mqtt/dist/mqtt' {
    import MQTT from 'mqtt';

    export = MQTT;
}

type StoryBoard = {
    [x: string]: any;
    name: string;
    langKind: string;
};

type Talk = {
    [x: string]: any;
    name: string;
    language: string;
};

type KeyWord = {
    id: number;
    keyword: string;
    talk_id: number;
};

type CustomPath = { name: string; to?: string };

type GuideData = {
    id: number;
    key: string;
    name: string;
    talk_start: string;
    points: number[];
    parts: { type: string; part_key: string }[];
};

type PartData = {
    key: string;
    actions: { action_type: string; continue_type: string; content: string }[];
};

type RouteData = {
    id: number;
    name: string;
    talk_start: string;
    talk_end: string;
    guide: string[];
};

type MediaData = {
    id: number;
    name: string;
    type: string;
    url: string;
};
