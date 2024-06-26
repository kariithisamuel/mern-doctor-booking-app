import { Link } from "react-router-dom";
import { HospitalType } from "../../../backend/src/shared/types";

type Props = {
  hospital: HospitalType;
};

const LatestDestinationCard = ({ hospital }: Props) => {
  return (
    <Link
      to={`/detail/${hospital._id}`}
      className="relative cursor-pointer overflow-hidden rounded-md"
    >
      <div className="h-[300px]">
        <img
          src={hospital.imageUrls[0]}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="absolute bottom-0 p-4 bg-black bg-opacity-70 w-full rounded-b-md">
       <span className="text-white font-bold tracking-tight text-3xl hover:text-rose-900">
          {hospital.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
