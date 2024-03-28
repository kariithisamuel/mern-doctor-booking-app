import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import ImageSection from "./ImageSection";
import PatientSection from "./PatientsSection";
import { HospitalType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HospitalFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageFiles: FileList;
    imageUrls: string[];
    adultCount: number;
    childCount: number;
}

type Props = {
    hospital?: HospitalType;
    onSave: (hospitalFormData: FormData) => void;
    isLoading: boolean
}

const ManageHospitalForm = ({ onSave, isLoading, hospital }: Props) => {
    const formMethods = useForm<HospitalFormData>();
    const { handleSubmit, reset } = formMethods;

    useEffect(() => {
        reset(hospital);
    }, [hospital, reset]);
    
     const onSubmit = handleSubmit((formDataJson: HospitalFormData) => {
        const formData = new FormData();
        if (hospital) {
            formData.append("hospitalId", hospital._id);
        }
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

       formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
       });
        
       if (formDataJson.imageUrls) {
  formDataJson.imageUrls.forEach((url, index) => {
    formData.append(`imageUrls[${index}]`, url);
  });
}

if (formDataJson.imageFiles) {
  Array.from(formDataJson.imageFiles).forEach((imageFile) => {
    formData.append(`imageFiles`, imageFile);
  });
}

             
        onSave(formData)
    });


    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection key="details" />
                <TypeSection key="type" />
                <FacilitiesSection key="facilities" />
                <PatientSection key="patients" />
                <ImageSection key="images" />
                <span className="flex justify-end">
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </button>
                </span>
            </form>
        </FormProvider>
    );
};

export default ManageHospitalForm;
