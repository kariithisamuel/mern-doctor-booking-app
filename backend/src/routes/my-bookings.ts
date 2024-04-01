import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth";
import Hospital from "../models/hospital";
import { HospitalType } from "../shared/types";

const router = express.Router();

router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hospitals = await Hospital.find({
      bookings: { $elemMatch: { userId: req.userId } },
    });

    const results = hospitals.map((hospital) => {
      const userBookings = hospital.bookings.filter(
        (booking) => booking.userId === req.userId
      );

      const hospitalWithUserBookings: HospitalType = {
        ...hospital.toObject(),
        bookings: userBookings,
      };

      return hospitalWithUserBookings;
    });

    res.status(200).send(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to fetch bookings" });
  }
});

export default router;
