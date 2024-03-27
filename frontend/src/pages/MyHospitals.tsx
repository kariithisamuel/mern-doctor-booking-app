import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from '../api-client';
import { BsBuilding, BsHospital, BsMap } from "react-icons/bs";
import { BiMoney , BiStar} from "react-icons/bi";

const MyHospitals = () => {
    const { data: hospitalData } = useQuery
        ("fetchMyHospitals",
            apiClient.fetchMyHospitals,
            {
                onError: () => { }
            }
    );
    
    if (!hospitalData) {
        return <span>No Hospital found</span>;
    }

    return (
        <div className="space-y-5">
       <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hospitals</h1>
        <Link
            to="/add-hospital"
            className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
        >
            Add Hospital
        </Link>
            </span>
            <div className="grid grid-cols-1 gap-8">
                {hospitalData.map((hospital) => (
                    <div
                    data-testid = "hospital-card"
                    className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5">
                      <h2 className="flex-2xl font-bold">{hospital.name}</h2>
                        <div className="whitespace-pre-line">{hospital.description}</div>
                          <div className="grid grid-cols-5 gap-2">
                            <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsMap className="mr-1" />
                                {hospital.city}, {hospital.country}
                            </div>
                             <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsBuilding className="mr-1" />
                                {hospital.type}
                        </div>
                         <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiMoney className="mr-1" />
                                ksh {hospital.pricePerNight} per night
                            </div>
                             <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BsHospital className="mr-1" />
                                {hospital.adultCount} adults, {hospital.childCount} children
                        </div>
                         <div className="border border-slate-300 rounded-sm p-3 flex items-center">
                                <BiStar className="mr-1" />
                               {hospital.starRating} star Rating
                        </div>
                        </div>
                        <span className="flex justify-end">
                            <Link
                                to={`/edit-hospital/${hospital._id}`}
                                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
                            >
                                View Details
                            </Link>
                        </span>
                 </div> 
             ))}
            </div>
     </div>
  );
};

export default MyHospitals;