const express = require('express');
const router = express.Router();
const Projects = require('./projectModel');

router.get('/', async (req, res) => {
	try {
		const projects = await Projects.get();
		res.status(200).json(projects);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'The projects information could not be retrieved.' });
	}
});

router.post('/', validateProject, async (req, res) => {
	try {
		const project = await Projects.insert(req.body);
		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({
			error: 'There was an error while saving the project to the database',
		});
	}
});

router.delete('/:id', validateProjectId, async (req, res) => {
	try {
		const { id } = req.params;
		const project = await Projects.remove(id);
		res.status(200).json(project);
	} catch (error) {
		res.status(500).json({
			error: 'The project could not be deleted.',
		});
	}
});

router.put('/:id', validateProjectId, validateProject, async (req, res) => {
	try {
		const { id } = req.params;
		const project = await Projects.update(id, req.body);
		res.status(201).json(project);
	} catch (error) {
		res.status(500).json({
			error: 'There was an error while updating the project to the database',
		});
	}
});

router.get('/:id/actions', validateProjectId, async (req, res) => {
	try {
		const { id } = req.params;
		const project = await Projects.getProjectActions(id);
		res.status(200).json(project);
	} catch (error) {
		res
			.status(500)
			.json({ error: 'The project information could not be retrieved.' });
	}
});

// middleware

async function validateProject(req, res, next) {
	if (Object.keys(req.body).length !== 0) {
		if (req.body.name && req.body.description) {
			next();
		} else {
			res
				.status(400)
				.json({ message: 'missing required name or description field' });
		}
	} else {
		res.status(400).json({ message: 'missing project data' });
	}
}

async function validateProjectId(req, res, next) {
	const { id } = req.params;
	const project = await Projects.get(id);
	if (project) {
		req.project = project;
		next();
	} else {
		res.status(400).json({ message: 'invalid project id' });
	}
}

module.exports = { router, validateProjectId };
