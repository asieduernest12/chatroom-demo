const express = require('express');
const nano = require('../database');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
	const rooms = await nano.db.use('rooms').list({ include_docs: true });
	res.json(rooms);
});

module.exports = router;
