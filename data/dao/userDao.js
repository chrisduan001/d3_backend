/**
 * Created by on 11/5/17.
 */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
    name: String,
    token: [{type: Schema.Types.ObjectId, ref: "token"}],
    refreshToken: String,
    password: {
        type: String,
        required: [true, "An error has occurred, check your password"]
    },
    email: {
        type: String,
        required: [true, "email can't be null"],
        unique: [true, "email exists"],
        index: true
    }
});

//note: can't use the fat error function here, won't be able to get value
UserSchema.pre("save", function(next) {
    if (this.isNew) {
        const user = this;
        bcrypt.hash(user.password, 10, (err, hash) => {
            if (err) {
                next(err);

                return;
            }
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

const User = mongoose.model("user", UserSchema);

//=============data access==============

exports.getUserById = (id, path, callback) => {
    User.findOne({_id: id})
        .populate(path)
        .then((user) => {
            callback(user, null);
        })
        .catch((err) => {
            console.log(err.message);
            callback(null, new Error());
        });
};

exports.getUserByEmail = (email, callback) => {
    User.findOne({email})
        .then((user) => {
            callback(user, null);
        })
        .catch((err) => {
            console.log(err.message);
            callback(null, new Error());
        });
};

exports.saveNewUser = (newUser, callback) => {
    const user = new User({name: newUser.name, email: newUser.email, password: newUser.password})

    user.save()
        .then(() => {
            callback(user, null);
        })
        .catch(() => {
            callback(null, new Error());
        });
};