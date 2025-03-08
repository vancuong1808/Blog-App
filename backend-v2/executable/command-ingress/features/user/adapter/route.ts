import express from 'express';
import { UserController } from './controller';
import requireAuthorizedUser from '../../../middlewares/auth';

const setupUserRoute = (controller: UserController) => {
    const router = express.Router();

    router.route('/:id')
        .get(controller.getOne.bind(controller));

    router.route('/follow/:id')
        .put(requireAuthorizedUser ,controller.followUser.bind(controller));

    router.route('/unfollow/:id')
        .put(requireAuthorizedUser ,controller.unfollowUser.bind(controller));

    router.route('/:id/followers')
        .get(controller.getFollowers.bind(controller));

    router.route('/:id/followings')
        .get(controller.getFollowings.bind(controller));

    return router;
}

export default setupUserRoute;
