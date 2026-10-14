"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { InfoIcon } from "@/components/ui/info-icon";
import { ProfileFormData } from "../types/settings.types";
import { useCountryStateCity } from "@/lib/hooks/useCountryStateCity";

interface ResidentialAddressSectionProps {
  formData: ProfileFormData;
  onChange: (field: keyof ProfileFormData, value: any) => void;
}

export const ResidentialAddressSection: React.FC<
  ResidentialAddressSectionProps
> = ({ formData, onChange }) => {
  const { countries, states, cities } = useCountryStateCity(
    formData.country,
    formData.stateOfResidence,
  );

  const handleCountryChange = (newCountry: string) => {
    onChange("country", newCountry);
    if (formData.country !== newCountry) {
      onChange("stateOfResidence", "");
      onChange("lga", "");
    }
  };

  const handleStateChange = (newState: string) => {
    onChange("stateOfResidence", newState);
    if (formData.stateOfResidence !== newState) {
      onChange("lga", "");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg lg:text-xl font-extrabold text-neutral-primary flex items-center gap-1.5">
        Residential Address <InfoIcon sectionName="Residential Address" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Country *"
          value={formData.country}
          onChange={handleCountryChange}
          placeholder="Select country"
          options={countries}
        />
        <Select
          label="State of Residence *"
          value={formData.stateOfResidence}
          onChange={handleStateChange}
          placeholder={
            formData.country ? "Select state" : "Select country first"
          }
          options={states}
          disabled={!formData.country}
        />
        <Select
          label="City / LGA *"
          value={formData.lga}
          onChange={(val) => onChange("lga", val)}
          placeholder={
            formData.stateOfResidence ? "Select city" : "Select state first"
          }
          options={cities}
          disabled={!formData.stateOfResidence}
        />
        <Input
          label="Residential Address *"
          value={formData.residentialAddress}
          onChange={(e) => onChange("residentialAddress", e.target.value)}
          placeholder="Street Address"
        />
      </div>
    </div>
  );
};
