const express = require('express');
const router = express.Router();
const Actions = require('./actionModel');
const validateProjectId = require('./projectRoutes');

router.get('/', async (req, res) => {
	try {
		const actions = await Actions.get();
		res.status(200).json(actions);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'The actions information could not be retrieved.' });
	}
});

// router.delete('/:id', validateProjectId, async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const action = await Actions.remove(id);
// 		res.status(200).json(action);
// 	} catch (error) {
// 		res.status(500).json({
// 			error: 'The action could not be deleted.',
// 		});
// 	}
// });

// router.put('/:id', validateProjectId, validateAction, async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const action = await Actions.update(id, req.body);
// 		res.status(201).json(action);
// 	} catch (error) {
// 		res.status(500).json({
// 			error: 'There was an error while updating the action to the database',
// 		});
// 	}
// });

// middleware



module.exports = router;
