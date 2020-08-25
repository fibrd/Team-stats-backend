const { Player, validate } = require('../models/player')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const validateObjectId = require('../middleware/validateObjectId')
const moment = require('moment')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
	const players = await Player.find().select('-__v').sort('name')
	res.send(players)
})

router.post('/', [auth], async (req, res) => {
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const player = new Player({
		name: req.body.name,
		number: req.body.number,
		fineTotal: req.body.fineTotal,
		finePaid: req.body.finePaid,
		createdAt: moment().toJSON(),
	})
	await player.save()

	res.send(player)
})

router.put('/:id', [auth], async (req, res) => {
	const { error } = validate(req.body)
	if (error) return res.status(400).send(error.details[0].message)

	const player = await Player.findByIdAndUpdate(
		req.params.id,
		{
			name: req.body.name,
			number: req.body.number,
			fineTotal: req.body.fineTotal,
			finePaid: req.body.finePaid,
		},
		{ new: true }
	)

	if (!player)
		return res
			.status(404)
			.send('The player with the given ID was not found.')

	res.send(player)
})

router.delete('/:id', [auth, admin], async (req, res) => {
	const player = await Player.findByIdAndRemove(req.params.id)

	if (!player)
		return res
			.status(404)
			.send('The player with the given ID was not found.')

	res.send(player)
})

router.get('/:id', validateObjectId, async (req, res) => {
	const player = await Player.findById(req.params.id).select('-__v')

	if (!player)
		return res
			.status(404)
			.send('The player with the given ID was not found.')

	res.send(player)
})

module.exports = router
