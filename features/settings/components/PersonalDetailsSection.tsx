"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { InfoIcon } from "@/components/ui/info-icon";
import { ProfileFormData } from "../types/settings.types";
import { useCountryStateCity } from "@/lib/hooks/useCountryStateCity";
import { GENDER_OPTIONS } from "@/lib/candidate-constants";

interface PersonalDetailsSectionProps {
  formData: ProfileFormData;
  onChange: (field: keyof ProfileFormData, value: any) => void;
}

export const PersonalDetailsSection: React.FC<PersonalDetailsSectionProps> = ({
  formData,
  onChange,
}) => {
  const { countries } = useCountryStateCity(
    formData.country,
    formData.stateOfResidence,
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg lg:text-xl font-extrabold text-neutral-primary flex items-center gap-1.5">
        Personal Details <InfoIcon sectionName="Personal Details" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="First Name *"
          value={formData.firstName}
          onChange={(e) => onChange("firstName", e.target.value)}
          placeholder="First name"
        />
        <Input
          label="Last Name *"
          value={formData.lastName}
          onChange={(e) => onChange("lastName", e.target.value)}
          placeholder="Surname"
        />
        <Input
          label="Middle Name"
          value={formData.middleName}
          onChange={(e) => onChange("middleName", e.target.value)}
          placeholder="Other names"
        />
        <DatePicker
          label="Date Of Birth *"
          placeholder="dd/mm/yyyy"
          maxYear={new Date().getFullYear() - 18}
          value={formData.dateOfBirth}
          onChange={(val) => onChange("dateOfBirth", val)}
        />
        <Select
          label="Gender *"
          value={formData.gender}
          onChange={(val) => onChange("gender", val)}
          options={GENDER_OPTIONS}
          placeholder="Select Gender"
        />
        <Select
          label="Nationality *"
          value={formData.nationality}
          onChange={(val) => onChange("nationality", val)}
          options={countries}
          placeholder="Select Nationality"
        />
      </div>
    </div>
  );
};
