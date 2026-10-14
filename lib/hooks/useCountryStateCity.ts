"use client";

import { useMemo } from "react";

export interface CountryStateCityOption {
  label: string;
  value: string;
}

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau",
  "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
];

const COMMON_COUNTRIES = [
  "Nigeria", "Ghana", "Kenya", "South Africa", "United Kingdom", "United States", "Canada"
];

const LAGOS_LGAS = [
  "Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe",
  "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island",
  "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"
];

const ABUJA_LGAS = [
  "Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council (AMAC)"
];

export function useCountryStateCity(
  countryInput?: string,
  stateInput?: string,
) {
  const countries = useMemo<CountryStateCityOption[]>(() => {
    return COMMON_COUNTRIES.map((c) => ({ label: c, value: c }));
  }, []);

  const states = useMemo<CountryStateCityOption[]>(() => {
    if (!countryInput || countryInput.toLowerCase() === "nigeria") {
      return NIGERIAN_STATES.map((s) => ({ label: s, value: s }));
    }
    return [{ label: "Default Region", value: "Default Region" }];
  }, [countryInput]);

  const cities = useMemo<CountryStateCityOption[]>(() => {
    if (!stateInput) return [];
    if (stateInput.toLowerCase().includes("lagos")) {
      return LAGOS_LGAS.map((l) => ({ label: l, value: l }));
    }
    if (stateInput.toLowerCase().includes("abuja") || stateInput.toLowerCase().includes("fct")) {
      return ABUJA_LGAS.map((l) => ({ label: l, value: l }));
    }
    return [
      { label: `${stateInput} Central`, value: `${stateInput} Central` },
      { label: `${stateInput} North`, value: `${stateInput} North` },
      { label: `${stateInput} South`, value: `${stateInput} South` },
    ];
  }, [stateInput]);

  return {
    countries,
    states,
    cities,
    lgas: cities,
    isLoading: false,
    isLoadingCountries: false,
    isLoadingStates: false,
    isLoadingLgas: false,
  };
}
