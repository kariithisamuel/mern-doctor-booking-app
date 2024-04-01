import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  HospitalSearchResponse,
  HospitalType,
  PaymentIntentResponse,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHospital = async (hospitalFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hospitals`, {
    method: "POST",
    credentials: "include",
    body: hospitalFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hospital");
  }

  return response.json();
};

export const fetchMyHospitals = async (): Promise<HospitalType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hospitals`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hospitals");
  }

  return response.json();
};

export const fetchMyHospitalById = async (hospitalId: string): Promise<HospitalType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hospitals/${hospitalId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hospitals");
  }

  return response.json();
};

export const updateMyHospitalById = async (hospitalFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hospitals/${hospitalFormData.get("hospitalId")}`,
    {
      method: "PUT",
      body: hospitalFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hospital");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHospitals = async (
  searchParams: SearchParams
): Promise<HospitalSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hospitals");
  }

  return response.json();
};

export const fetchHospitals = async (): Promise<HospitalType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hospitals`);
  if (!response.ok) {
    throw new Error("Error fetching hospitals");
  }
  return response.json();
};

export const fetchHospitalById = async (hospitalId: string): Promise<HospitalType> => {
  const response = await fetch(`${API_BASE_URL}/api/hospitals/${hospitalId}`);
  if (!response.ok) {
    throw new Error("Error fetching Hospitals");
  }

  return response.json();
};

export const createPaymentIntent = async (
  hospitalId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/${hospitalId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hospitals/${formData.hospitalId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<HospitalType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};
