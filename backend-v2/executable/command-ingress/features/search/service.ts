import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import UserModel from '../../../../internal/model/user'
import PostModel from '../../../../internal/model/post'


export const storieSearch = asyncHandler(async (req, res, next) => {
    const { query } = req.params;
    if (!query) {
        next("Query not found");
    }
    try {
        const PostSearch = await PostModel.find(
                                {
                                    $or : [
                                        { title : { $regex : query, $options : "isx" } },
                                        { tags : { $in : [query] } }
                                    ]
                                });
        if (!PostSearch) {
            next("PostSearch not found");
        }
        res.status(200).json({
            
        })
    } catch (_error) {
        next(_error);
    }
});

export const topicSearch = asyncHandler(async (req, res, next) => {

});

export const peopleSearch = asyncHandler(async (req, res, next) => {

});
