import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-client';
import ManageHospitalForm from "../forms/ManageHospitalForm/ManageHospitalForm";
import { useAppContext } from "../contexts/AppContext";

const EditHospital = () => {
    const { hospitalId } = useParams();
    const { showToast } = useAppContext();

    const { data: hospital } = useQuery(
        " fetchMyHospitalById", () =>
        apiClient.fetchMyHospitalById(hospitalId || ''),
        {
        enabled: !! hospitalId,
        }
    );

    const { mutate, isLoading } = useMutation(apiClient.updateMyHospitalById, {
        onSuccess: () => {
            showToast({ message: "Hospital Saved!", type: "SUCCESS" });
        },
        onError: () => {
            showToast({ message: "Error Saving Hospital", type: "ERROR" });
        },
    });
   
    const handleSave = (hospitalFormData: FormData) => {
        mutate(hospitalFormData);
    };

    return (
        <ManageHospitalForm hospital={hospital} onSave={handleSave} isLoading={isLoading} />
    );
    };

export default EditHospital;