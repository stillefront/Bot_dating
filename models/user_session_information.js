var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var User_sessions_informationSchema = new Schema (
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
User_sessions_informationSchema
.virtual('url')
.get(function () {
  return '/main/user_sessions_information/' + this._id;
});

module.exports = mongoose.model('User_sessions_information', User_sessions_informationSchema);