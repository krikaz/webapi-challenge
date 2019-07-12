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

router.post('/', validateAction, async (req, res) => {
	try {
		const action = await Actions.insert(req.body);
		res.status(201).json(action);
	} catch (error) {
		res.status(500).json({
			error: 'There was an error while saving the action to the database',
		});
	}
});

router.delete('/:id', validateProjectId, async (req, res) => {
	try {
		const { id } = req.params;
		const action = await Actions.remove(id);
		res.status(200).json(action);
	} catch (error) {
		res.status(500).json({
			error: 'The action could not be deleted.',
		});
	}
});

router.put('/:id', validateProjectId, validateAction, async (req, res) => {
	try {
		const { id } = req.params;
		const action = await Actions.update(id, req.body);
		res.status(201).json(action);
	} catch (error) {
		res.status(500).json({
			error: 'There was an error while updating the action to the database',
		});
	}
});

// middleware

async function validateAction(req, res, next) {
	if (Object.keys(req.body).length !== 0) {
		if (req.body.description && req.body.notes) {
			if (req.body.description.length < 128) {
				next();
			} else {
				res
					.status(400)
					.json({ message: 'description too long (max 128 characters)' });
			}
		} else {
			res
				.status(400)
				.json({ message: 'missing required name or description field' });
		}
	} else {
		res.status(400).json({ message: 'missing project data' });
	}
}

module.exports = router;
