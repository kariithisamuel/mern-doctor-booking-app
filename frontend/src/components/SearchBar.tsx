import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdLocalHospital} from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search")
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
  <form
  onSubmit={handleSubmit}
  className="-mt-8 p-3 bg-gray-400 rounded shadow-md flex flex-col lg:flex-row items-center gap-4"
>
  <div className="flex bg-white p-2 rounded-lg w-full">
    <MdLocalHospital size={25} className="mr-2" />
    <input
      placeholder="Which hospital are you interested in?"
      className="text-md w-full focus:outline-none"
      value={destination}
      onChange={(event) => setDestination(event.target.value)}
    />
  </div>

  <div className="flex bg-white p-2 gap-2 rounded-lg w-full">
    <label className="flex items-center">
      Adult:
      <input
        className="w-full p-1 focus:outline-none font-bold"
        type="number"
        min={1}
        max={20}
        value={adultCount}
        onChange={(event) => setAdultCount(parseInt(event.target.value))}
      />
    </label>
    <label className="flex items-center">
      Child:
      <input
        className="w-full p-1 focus:outline-none font-bold"
        type="number"
        min={0}
        max={20}
        value={childCount}
        onChange={(event) => setChildCount(parseInt(event.target.value))}
      />
    </label>
  </div>
  <div className="flex bg-white p-2 rounded-lg w-full">
    <DatePicker
      selected={checkIn}
      onChange={(date) => setCheckIn(date as Date)}
      selectsStart
      startDate={checkIn}
      endDate={checkOut}
      minDate={minDate}
      maxDate={maxDate}
      placeholderText="Check-in Date"
      className="w-full bg-white p-2 focus:outline-none"
    />
  </div>
  <div className="flex bg-white p-2 rounded-lg w-full">
    <DatePicker
      selected={checkOut}
      onChange={(date) => setCheckOut(date as Date)}
      selectsStart
      startDate={checkIn}
      endDate={checkOut}
      minDate={minDate}
      maxDate={maxDate}
      placeholderText="Check-out Date"
      className="w-full bg-white p-2 focus:outline-none"
    />
  </div>
  <div className="flex gap-1 mt-2 lg:mt-0">
    <button className="bg-blue-600 text-white p-2 font-bold text-xl rounded-xl hover:bg-blue-500">
      Search
    </button>
    <button className="bg-rose-600 text-white p-2 font-bold text-xl rounded-xl hover:bg-red-500">
      Clear
    </button>
  </div>
</form>



  );
};

export default SearchBar;
