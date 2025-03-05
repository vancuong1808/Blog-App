import express from 'express';
import {storieSearch, topicSearch, peopleSearch,} from './service';

const router = express.Router();

router.route('/stories/:query').post(storieSearch);
router.route('/people/:query').post(peopleSearch);
router.route('/topics/:query').post(topicSearch);

export default router;
