import { Link } from "react-router-dom";
import { HospitalType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
type Props = {
  hospital: HospitalType;
};

const SearchResultsCard = ({ hospital }: Props) => {
  return (
  <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
    <div className="w-full h-[300px]">
      <img
        src={hospital.imageUrls[0]}
        className="w-full h-full object-cover object-center rounded-lg"
        alt="Hospital"
      />
    </div>
    <div className="grid grid-rows-[1fr_2fr_1fr]">
      <div>
        <div className="flex items-center">
          <span className="flex">
            {Array.from({ length: hospital.starRating }).map((_, index) => (
              <AiFillStar key={index} className="fill-yellow-400" />
            ))}
          </span>
          <span className="ml-1 text-sm">{hospital.type}</span>
        </div>
        <Link
          to={`/detail/${hospital._id}`}
          className="text-2xl font-bold cursor-pointer"
        >
          {hospital.name}
        </Link>
      </div>

      <div>
        <div className="line-clamp-4">{hospital.description}</div>
      </div>

      <div className="grid grid-cols-2 items-end whitespace-nowrap">
        <div className="flex gap-1 items-center">
          {hospital.facilities.slice(0, 2).map((facility) => (
            <span  className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
              {facility}
            </span>
          ))}
           <span className="text-sm">
            {hospital.facilities.length > 3 && `+${hospital.facilities.length - 3} more`}
            </span>

        </div>
        <div className="flex flex-col items-end gap-1">
            <span className="font-bold">ksh{hospital.pricePerNight} per night</span>
          <Link
            to={`/detail/${hospital._id}`}
            className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit rounded-lg hover:bg-blue-500"
          >
            View More
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default SearchResultsCard;
