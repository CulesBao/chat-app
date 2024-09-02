import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_block: {
        type: Boolean,
        default: false,
    },
    create_at: {
        type: Date,
        default: Date.now,
    },
    update_at: {
        type: Date,
        default: Date.now,
    }
}, {
    collection: 'users'
})

usersSchema.pre('save', function(next) {
    this.update_at = Date.now()
    next()
})

const users = mongoose.model('users', usersSchema)
export default users