const { Schema } = require('mongoose');
const connections = require('../config/connection');

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
}, {
    collection: 'grabbingEmails',
    versionKey: false,
}, );

module.exports = connections.model('GrabbingEmails', UserSchema);
