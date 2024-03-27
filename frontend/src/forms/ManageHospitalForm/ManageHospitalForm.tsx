import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import ImageSection from "./ImageSection";
import PatientSection from "./PatientsSection";

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
    adultCount: number;
    childCount: number;
}

type props = {
    onSave: (hospitalFormData: FormData) => void
    isLoading: boolean
}

const ManageHospitalForm = ({onSave, isLoading}: props) => {
    const formMethods = useForm<HospitalFormData>()
    const { handleSubmit } = formMethods;
    const onSubmit = handleSubmit((formDataJson: HospitalFormData) => {
        const formData = new FormData();
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
        
        
        
      Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
      });
        onSave(formData)
        
    });

    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                <DetailsSection />
                <TypeSection />
                <FacilitiesSection />
                <PatientSection/>
                <ImageSection />
                <span className="flex justify-end">
                    <button
                        disabled= {isLoading}
                        type="submit"
                        className="bg-blue-600 text-white
                         p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
                    >
                        {isLoading? "Saving...": "Save"}
                </button>
                </span>
        </form>
    </FormProvider>
    );
};

export default ManageHospitalForm;