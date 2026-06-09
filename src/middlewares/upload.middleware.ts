import multer from "multer";
import uuid from "uuid";
import path from "path";
import { Request } from "express";
import { HttpException } from "../exceptions/http-exception";
import fs from "fs";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "../../uploads"); // __dirname -> current dir
        if(!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath); // create uploads dir if not exists
        }
        cb(null, path.join(__dirname, "../../uploads")); // save to uploads dir
    },
    filename: function (req: Request, file, cb) {
        const fileSuffix = uuid.v4();
        cb(null, fileSuffix + "-" + file.originalname); // unique filename
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true); // accept file
    } else {
        cb(new HttpException(400, "Only JPEG and PNG files are allowed")); // reject file
    }
}
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB limit
    },
    fileFilter
});

export const uploads = {
    single:(fieldName: string) => upload.single(fieldName),
    array: (fieldName: string, maxCount: number) => upload.array(fieldName, maxCount),
    fields: (fieldsArray: { name: string, maxCount?: number }[]) => upload.fields(fieldsArray)
}