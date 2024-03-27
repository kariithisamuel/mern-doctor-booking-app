import express, { Request, Response } from "express";
import cloudinary from 'cloudinary';
import multer from 'multer';
import Hospital, { HospitalType } from "../models/hospital";
import verifyToken from "../middleware/auth";
import { body } from "express-validator";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

router.post(
    "/", 
    verifyToken,
    [
        body("name").notEmpty().withMessage('Name is required'),
        body("city").notEmpty().withMessage('City is required'),
        body("country").notEmpty().withMessage('Country is required'),
        body("description").notEmpty().withMessage('Description is required'),
        body("type").notEmpty().withMessage('Hospital type is required'),
        body("pricePerNight").notEmpty().isNumeric().withMessage('Price per night is required and must be a number'),
        body("facilities").notEmpty().isArray().withMessage('Facilities are required'),
    ],
    upload.array("imageFiles", 6),
    async (req: Request, res: Response) => {
        try {
            const imageFiles = req.files as Express.Multer.File[];
            const newHospital: HospitalType = req.body;

            const uploadPromises = imageFiles.map(async (image) => {
                const b64 = Buffer.from(image.buffer).toString("base64")
                let dataURI = "data:" + image.mimetype + ";base64," + b64;
                const res = await cloudinary.v2.uploader.upload(dataURI);
                return res.url;
            });

            const imageUrls = await Promise.all(uploadPromises);
            newHospital.imageUrls = imageUrls;
            newHospital.lastUpdated = new Date();
            newHospital.userId = req.userId;

            const hospital = new Hospital(newHospital);
            await hospital.save();

            res.status(201).send(hospital);

        } catch (e) {
            console.log("Error creating hospital: ", e);
            res.status(500).json({ message: "something went wrong" });
        }
    });

export default router;