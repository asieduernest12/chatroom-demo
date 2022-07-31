const express = require('express');
const { route } = require('.');
const nano = require('../database');

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
	const data = await nano.db.use('messages').list({ include_docs: true });
	res.json(data);
});

router.get('/room/:room_id', async (req, res, next) => {
	// fetch the messages for this room

	const { room_id } = req.params;
	const query = { selector: { room_id: room_id } };

	console.dir({ room_id, query });

	// const data = await nano.db.use('rooms').find(JSON.parse(JSON.stringify(query)));
	const data = await nano.db.use('messages').list({ include_docs: true });
	const response = data.rows.map(({ doc }) => doc).filter((doc) => doc.room_id === room_id);
	res.json(data);
});

router.post('/', async (req, res, next) => {
	const { new_message } = req.body;

	const {
		uuids: [_id],
	} = await nano.uuids();

	const data = await nano.db.use('messages').insert({  _id, ...new_message });

	res.json(data);
});

module.exports = router;
