import express from 'express';
import {postSearch, topicSearch, peopleSearch,} from './service';

const router = express.Router();

router.route('/posts/:query').post(postSearch);
router.route('/users/:query').post(peopleSearch);
router.route('/topics/:query').post(topicSearch);

export default router;
