const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const bcrypt = require('bcrypt'),
    bcrypt_round = 5;

const validator = require('validator');

const userSchema = new schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (str) {
                return validator.isEmail(str);
            },
            message: "Email not vallid"
        }
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
}
);

userSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(bcrypt_round, function (err, salt) {
            if (err) return next(err);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        return next();
    }
});

userSchema.pre('findOneAndUpdate', async function (next) {
    try {
        if(this._update.password){
            const hashed = await bcrypt.hash(this._update.password, bcrypt_round);
            this._update.password = hashed;
        }
        next();
    } catch (err) {
        return next(err);
    }
});

userSchema.method.isPassMatch = function (pass, callback) {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    })
}

module.exports = mongoose.model('User', userSchema);