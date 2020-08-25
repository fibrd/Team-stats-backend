const Joi = require('joi')
const mongoose = require('mongoose')

const Player = mongoose.model(
	'Players',
	new mongoose.Schema({
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
			maxlength: 255,
		},
		number: {
			type: Number,
			required: true,
			min: 1,
			max: 99,
		},
		fineTotal: {
			type: Number,
			required: true,
			min: 0,
			max: 255,
		},
		finePaid: {
			type: Number,
			required: true,
			min: 0,
			max: 255,
		},
	})
)

function validatePlayer(player) {
	const schema = {
		name: Joi.string().min(5).max(50).required(),
		number: Joi.number().min(1).max(99).required(),
		fineTotal: Joi.number().min(0).required(),
		finePaid: Joi.number().min(0).required(),
	}

	return Joi.validate(player, schema)
}

exports.Player = Player
exports.validate = validatePlayer
