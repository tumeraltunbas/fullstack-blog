import multer from "multer";
import rootPath from "app-root-path";
import CustomError from "../error/CustomError.js";
import { generate } from "randomstring";

const storage = multer.diskStorage({

    destination:  `${rootPath.path}\\public`,

    filename: function(req, file, cb)
    {
        const extension = file.mimetype.split("/")[1];
        const fileName = String(req.user.id + "_" + generate(5) + "." + extension)
        cb(null, fileName);
    }
});

const fileFilter = (req, file, cb) =>
{
    const allowedMimetypes = ['image/jpg', "image/jpeg", "image/png"];
    if(!allowedMimetypes.includes(file.mimetype))
    {
        return cb(new CustomError(400, "Unsupported file type. Just use jpg, jpeg or png types"), false);
    }
    cb(null, true);   
}

export const upload = multer({storage:storage, fileFilter:fileFilter});