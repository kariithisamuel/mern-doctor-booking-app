import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import PatientInfoForm from "../forms/PatientInfoForm/PatientInfoForm";

const Detail = () => {
  const { hospitalId } = useParams();

  const { data: hospital } = useQuery(
    "fetchHospitalById",
    () => apiClient.fetchHospitalById(hospitalId || ""),
    {
      enabled: !!hospitalId,
    }
  );
 
  if (!hospital) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div>
        <span className="flex">
          {Array.from({ length: hospital.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hospital.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {hospital.imageUrls.map((image) => (
          <div className="h-[300px]">
            <img
              src={image}
              alt={hospital.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hospital.facilities.map((facility) => (
          <div className="border border-slate-300 rounded-sm p-3">
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hospital.description}</div>
        <div className="h-fit">
          <PatientInfoForm
            pricePerNight={hospital.pricePerNight}
            hospitalId={hospital._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
