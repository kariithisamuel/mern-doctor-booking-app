import React, { useContext, useState } from "react";

type SearchContextType = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hospitalId: string;
    saveSearchValues: (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hospitalId?: string
    ) => void;
};

const SearchContext = React.createContext<SearchContextType | undefined>(undefined);

type SearchContextProviderProps = {
    children: React.ReactNode;
};

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
    const [destination, setDestination] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [adultCount, setAdultCount] = useState<number>(1);
    const [childCount, setChildCount] = useState<number>(0);
    const [hospitalId, setHospitalId] = useState<string>("");

    const saveSearchValues = (
        destination: string,
        checkIn: Date,
        checkOut: Date,
        adultCount: number,
        childCount: number,
        hospitalId?: string
    ) => {
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if (hospitalId) {
            setHospitalId(hospitalId);
        }
    };

    const searchContextValue: SearchContextType = {
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hospitalId,
        saveSearchValues,
    };

    return (
        <SearchContext.Provider value={searchContextValue}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearchContext must be used within a SearchContextProvider");
    }
    return context;
};
