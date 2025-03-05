import asyncHandler from 'express-async-handler';
import UserModel from '../../../../internal/model/user'
import PostModel from '../../../../internal/model/post'


export const postSearch = asyncHandler(async (req, res, next) => {
    const { query } = req.params;
    if (!query) {
        next("Query not found");
        return;
    }
    try {
        const PostSearch = await PostModel
                                    .find({ $or : [
                                            { title : { $regex : query, 
                                                        $options : "isx" } },
                                            { tags : { $in : [query] } }
                                        ]});
        if (!PostSearch) {
            next("PostSearch not found");
            return;
        }
        const PostSearchResult = await Promise.all(
            PostSearch.map ( async(post : any) => {
                const user = await UserModel
                                    .findOne({ _id : post.author });
                if (!user) {
                    next("User not found");
                    return null;
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
        res.status(200).json( PostSearchResult );
        return;
    } catch (_error) {
        next(_error);
    }
});

export const topicSearch = asyncHandler(async (req, res, next) => {
    const { query } = req.params;
    if (!query) {
        next("Query not found");
        return;
    }
    try {
        const TopicSearch = await PostModel
                                    .find({ tags : { $in : [query] } });
        if (!TopicSearch) {
            next("Topic not found");
            return;
        }
        const TopicSearchResult = TopicSearch.map((topic : any) => {
            return {
                id : String(topic.id),
                name : topic.tags.at(0)
            }
        });
        console.log(TopicSearchResult);
        res.status(200).json(TopicSearchResult);
    } catch (_error) {
        next(_error);
    }
});

export const peopleSearch = asyncHandler(async (req, res, next) => {
    const { query } = req.params;
    if (!query) {
        next("Query not found");
        return;
    }
    try {
        const UserSearch = await UserModel
                                    .find({ name : { $regex : query, $options : "isx" }})
                                    .populate("followers");
        if (!UserSearch) {
            next("UserSearch not found");
            return;
        }
        const UserSearchResult = UserSearch.map( (user : any) => {
            return {
                id : String(user._id),
                name :  user.name,
                avatar : user.avatar,
                followers : user.followers
            }
        })
        console.log(UserSearchResult)
        res.status(200).json(UserSearchResult);
        return;
    } catch (_error) {
        next(_error);
    }
});
