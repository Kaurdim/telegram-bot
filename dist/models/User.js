"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
exports.UserSchema = new mongoose_1.default.Schema({
    _id: String,
    created: Number,
    name: String,
    username: String,
    observableMovies: [
        {
            _id: String,
        }
    ],
    language: String,
}, { _id: false });
const User = mongoose_1.default.model('User', exports.UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map