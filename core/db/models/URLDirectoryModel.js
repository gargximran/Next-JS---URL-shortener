import mongoose from "mongoose";

const URLDirectorySchema = new mongoose.Schema(
    {
        url: {
            required: true,
            type: String
        },
        slug: {
            required: true,
            type: String,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

const URLDirectoryModel = mongoose.models.URLDirectory || mongoose.model('URLDirectory', URLDirectorySchema)

export default URLDirectoryModel