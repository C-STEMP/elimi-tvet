"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";
import { InfoIcon } from "@/components/ui/info-icon";
import { ProfileFormData } from "../types/settings.types";

interface ContactInfoSectionProps {
  formData: ProfileFormData;
  onChange: (field: keyof ProfileFormData, value: any) => void;
}

export const ContactInfoSection: React.FC<ContactInfoSectionProps> = ({
  formData,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg lg:text-xl font-extrabold text-neutral-primary flex items-center gap-1.5">
        Contact Information <InfoIcon sectionName="Contact Information" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address *"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="yourname@email.com"
        />
        <PhoneInput
          label="Phone Number *"
          value={formData.phone}
          onChange={(val) => onChange("phone", val)}
          onCountryChange={(cName) => onChange("country", cName)}
          defaultCountry="NG"
        />
      </div>
    </div>
  );
};
