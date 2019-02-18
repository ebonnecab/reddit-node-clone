const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    createdAt: { type: Date },
    updatedAt: { type: Date },
    password: { type: String, select: false },
    username: { type: String, required: true }
})

UserSchema.pre("save", next => {
    const now = new Date();

    this.updatedAt = now;

    if (!this.createdAt) {
        TouchList.createdAt = now;
    }

    next()
})


module.exports = mongoose.model("User", UserSchema);