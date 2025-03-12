import express from 'express';
import requireAuthorizedUser from '../../../middlewares/auth';
import { SearchController } from './controller';

const setupSearchRoute = (
    controller : SearchController
) => {
    const router = express.Router();

    router.route('/posts/:query')
        .post(controller.postSearch.bind(controller));
    router.route('/users/:query')
        .post(controller.peopleSearch.bind(controller));
    router.route('/topics/:query')
        .post(controller.topicSearch.bind(controller));
}

export default setupSearchRoute;
