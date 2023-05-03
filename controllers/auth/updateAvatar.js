const fs = require("fs/promises");
const path = require("path");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const {User} = require("../../models/user");
const {resizeAndUpload} = require("../../helpers");

const updateAvatar = async(req, res)=> {
    const {_id} = req.user;
    console.log(req.file)
    const {path: tempUpload, filename} = req.file;
    const avatarName = `${_id}_resized_${filename}`;
    const resultUpload = path.join(avatarsDir, avatarName);

    try {
        await resizeAndUpload(tempUpload,resultUpload);
        await fs.unlink(tempUpload);
    } catch (error) {
        throw Error("Please check file extension(jpeg, png, bpm, tiff, gif)!")
        // throw Error(error.message)
    }
    
    const avatarURL = path.join("avatars", avatarName);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({avatarURL});
}

module.exports = updateAvatar;