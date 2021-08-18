const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
	fullname: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
        required: true,
        trim: true
    },
    confirmPassword: {
        type: String,
        required: false,
        trim: true
    },
	country: {
		type: String,
        required: true,
        trim: true,
    },
    custom_country: {
		type: String,
        required: false,
        trim: true,
	},
});
module.exports = mongoose.model('User', UserSchema);
