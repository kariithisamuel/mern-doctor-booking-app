import { hospitalTypes } from "../config/hospital-hospital-config";

type Props = {
  selectedHospitalTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HospitalTypesFilter = ({ selectedHospitalTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hospital Type</h4>
      {hospitalTypes.map((hospitalType) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={hospitalType}
            checked={selectedHospitalTypes.includes(hospitalType)}
            onChange={onChange}
          />
          <span>{hospitalType}</span>
        </label>
      ))}
    </div>
  );
};

export default HospitalTypesFilter;
