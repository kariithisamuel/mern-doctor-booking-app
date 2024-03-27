import { useMutation } from "react-query";
import ManageHospitalForm from "../forms/ManageHospitalForm/ManageHospitalForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from '../api-client';

const AddHospital = () => {

    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.addMyHospital, {
        onSuccess: () => {
            showToast( { message: "Hospital Saved! ", type: "SUCCESS"})
        },
        onError: () => {
            showToast({ message: "Error saving Hospital", type: "ERROR" });
        },
    });

    const handleSave = (hospitalFormData: FormData) => {
        mutate(hospitalFormData)
    };

    return <ManageHospitalForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHospital;