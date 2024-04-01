import { HospitalType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hospital: HospitalType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hospital,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl text-slate-900 font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${hospital.name}, ${hospital.city}, ${hospital.country}`}</div>
      </div>
      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold"> {checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold"> {checkOut.toDateString()}</div>
        </div>
      </div>
      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>

      <div>
        Patients{" "}
        <div className="font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
