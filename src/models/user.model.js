import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
    },

    password: {
        type: String,
        required: [true, "Password is required"]
    },

    accountType: {
        type: String,
        required: true,
    },

    clientData: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        }
    ]
}, {timestamps: true});


userSchema.methods.generateAccessToken = async function (){
    const accessToken = await jwt.sign(
        {
            fullname: this.fullname,
            email: this.email,
            id: this._id
        },

        process.env.ACCESS_TOKEN_SECRET_KEY,
        
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );

    return accessToken;
}

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
       return next();
    }

    this.password = await bcrypt.hash(this.password, 10);
    return next();
});

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", userSchema);