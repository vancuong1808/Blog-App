import UserModel from '../../../../../internal/model/user'
import PostModel from '../../../../../internal/model/post'
import { PostSearch, PeopleSearch, TopicSearch, SearchService } from '../types';

export class SearchServiceImpl implements SearchService {
    async postSearch(query : string) : Promise<PostSearch[]> {
        if (!query) {
            throw new Error('Query not found');
        }
        const PostSearch = await PostModel
                                    .find({ $or : [
                                            { title : { $regex : query,
                                                        $options : 'isx' } },
                                            { tags : { $in : [query] } }
                                        ]});
        if (!PostSearch) {
            throw new Error('PostSearch not found');
        }
        const PostSearchResult = await Promise.all(
            PostSearch.map ( async(post : any) => {
                const user = await UserModel
                                    .findOne({ _id : post.author });
                if (!user) {
                    throw new Error('User not found');
                }
                return {
                    id: String(post._id),
                    image: String(post.image),
                    authorID: String(post.author),
                    markdown: post.markdown,
                    title: post.title,
                    tags: post.tags,
                    summary: post.summary,
                    createdAt: Number(post.createdAt),
                    author: {
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        avatar: user.avatar,
                    }
                }
            }
        ))
        return PostSearchResult;
    }

    async peopleSearch(query : string) : Promise<PeopleSearch[]> {
        if (!query) {
            throw new Error('Query not found');
        }
        const UserSearch = await UserModel
                                    .find({ name : { $regex : query, $options : 'isx' }})
                                    .populate('followers');
        if (!UserSearch) {
            throw new Error('UserSearch not found');
        }
        const UserSearchResult = UserSearch.map( (user : any) => {
            return {
                id : String(user._id),
                name :  user.name,
                avatar : user.avatar,
                followers : user.followers,
                bio : user.bio,
            }
        })
        return UserSearchResult;
    }

    async topicSearch(query : string) : Promise<TopicSearch[]> {
        if (!query) {
            throw new Error('Query not found');
        }
        const TopicSearch = await PostModel
                                    .find({ tags : { $in : [query] } });
        if (!TopicSearch) {
            throw new Error('Topic not found');
        }
        const TopicSearchResult = TopicSearch.map((topic : any) => {
            return {
                id : String(topic.id),
                name : topic.tags.at(0)
            }
        });
        return TopicSearchResult;
    }
}
