import { UserEntity } from '../user/types';

export type PostSearch = {
    id: string;
    markdown: string;
    title: string;
    authorID: string;
    image: string;
    tags: string[];
    summary: string;
    createdAt: number;
    author?: UserEntity;
}

export type PeopleSearch = {
    id : string;
    name :  string;
    avatar : string;
    followers : UserEntity[];
    bio : string;
}

export type TopicSearch = {
    id : string;
    name : string;
}

export interface SearchService {
    postSearch(query : string) : Promise<PostSearch[]>;
    topicSearch(query : string) : Promise<TopicSearch[]>;
    peopleSearch(query : string) : Promise<PeopleSearch[]>;
}