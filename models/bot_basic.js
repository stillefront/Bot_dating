var mongoose = require('mongoose');

var Schema = mongoose.Schema;
/*
var Bot_basicSchema = new Schema (
    {
        name: {type: String},
        description: {type: String},
        image_path: {type: String},
        auth_token: {type: String},
        dev_token: {type: String},
        date_created: {type: Date, default: Date.now},
        created: {
            type: Date,
            default: Date.now
        }
    }
);
*/
var Bot_basicSchema = new Schema (
    {
        name: {type: String},
        description: {type: String},
        image_path: {type: String},
        workspace_id_token: {type: String},
        username_token: {type: String},
        password_token: {type: String},
        date_created: {type: Date, default: Date.now},
    }
);

// Virtual for Bot's URL
Bot_basicSchema
.virtual('url')
.get(function () {
  return '/main/bot/' + this._id;
});

module.exports = mongoose.model('Bot_basic', Bot_basicSchema);