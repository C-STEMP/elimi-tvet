"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";
import { UploadIcon } from "@/components/ui/svg-icons";
import {
  getUser,
  saveInstitutionData,
  saveOnboardedStatus,
  getInstitutionData,
} from "@/lib/auth-storage";
import {
  validateRequired,
  validateEmail,
  validatePhone,
} from "@/lib/validation";

export const InstitutionOnboarding: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [organizationName, setOrganizationName] = useState("");
  const [organizationType, setOrganizationType] = useState("");
  const [industrySector, setIndustrySector] = useState("");
  const [website, setWebsite] = useState("");

  const [contactPersonName, setContactPersonName] = useState("");
  const [officialPosition, setOfficialPosition] = useState("");
  const [officialEmail, setOfficialEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Logo upload state
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoName, setLogoName] = useState<string>("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const user = getUser();
    if (user?.email) {
      setOfficialEmail((prev) => prev || user.email);
    }

    const existing = getInstitutionData();
    if (existing) {
      setOrganizationName(existing.organizationName || "");
      setOrganizationType(existing.organizationType || "");
      setIndustrySector(existing.industrySector || "");
      setWebsite(existing.website || "");
      setContactPersonName(existing.contactPersonName || "");
      setOfficialPosition(existing.officialPosition || "");
      setOfficialEmail(existing.officialEmail || user?.email || "");
      setPhoneNumber(existing.phoneNumber || "");
      if (existing.logoUrl) {
        setLogoPreview(existing.logoUrl);
        setLogoName(existing.logoName || "Uploaded Logo");
      }
    }
  }, []);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({
        type: "error",
        title: "File Too Large",
        description: "Logo file size must be less than 5MB.",
      });
      return;
    }

    setLogoName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      setLogoPreview(event.target?.result as string);
      toast({
        type: "success",
        title: "Logo Uploaded",
        description: `${file.name} uploaded successfully.`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLogoPreview(null);
    setLogoName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    const orgNameErr = validateRequired(organizationName, "Organization Name");
    if (orgNameErr) newErrors.organizationName = orgNameErr;

    const orgTypeErr = validateRequired(organizationType, "Organization Type");
    if (orgTypeErr) newErrors.organizationType = orgTypeErr;

    const sectorErr = validateRequired(industrySector, "Industry / Sector");
    if (sectorErr) newErrors.industrySector = sectorErr;

    const contactNameErr = validateRequired(
      contactPersonName,
      "Contact Person Full Name",
    );
    if (contactNameErr) newErrors.contactPersonName = contactNameErr;

    const positionErr = validateRequired(
      officialPosition,
      "Official Position / Title",
    );
    if (positionErr) newErrors.officialPosition = positionErr;

    const emailErr = validateEmail(officialEmail);
    if (emailErr) newErrors.officialEmail = emailErr;

    const phoneErr = validatePhone(phoneNumber);
    if (phoneErr) newErrors.phoneNumber = phoneErr;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({
        type: "error",
        title: "Incomplete Information",
        description: "Please fill in all required fields accurately.",
      });
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Save institution details locally (until backend endpoint is ready)
    saveInstitutionData({
      organizationName,
      organizationType,
      industrySector,
      website: website || undefined,
      contactPersonName,
      officialPosition,
      officialEmail,
      phoneNumber,
      logoUrl: logoPreview || undefined,
      logoName: logoName || undefined,
      onboardedAt: new Date().toISOString(),
    });

    saveOnboardedStatus(true);

    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/onboarding/success");
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-[540px] mx-auto flex flex-col justify-start select-text pb-12"
    >
      {/* Top Header & Logo Upload Box */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-neutral-primary">
            Institution Onboarding
          </h1>
          <p className="text-neutral-secondary text-xs sm:text-sm font-normal mt-1">
            Collect only essential information.
          </p>
        </div>

        {/* Upload Logo Widget */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative shrink-0 w-28 sm:w-32 h-24 sm:h-28 rounded-2xl border-2 border-dashed border-[#F4B4C1] bg-[#FDF4F6] hover:bg-[#FCEAEF] transition-all flex flex-col items-center justify-center p-2 text-center cursor-pointer group"
          title="Upload Organization Logo"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoChange}
          />

          {logoPreview ? (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <Image
                src={logoPreview}
                alt="Logo preview"
                width={70}
                height={70}
                className="max-h-16 w-auto object-contain rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveLogo}
                className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-700 shadow-md cursor-pointer"
                title="Remove logo"
              >
                ✕
              </button>
            </div>
          ) : (
            <>
              <div className="text-primary mb-1 text-primary-solid transition-transform group-hover:scale-110">
                <UploadIcon className="w-5 h-5 text-primary stroke-[2.2]" />
              </div>
              <span className="text-primary text-[11px] sm:text-xs font-bold leading-tight">
                Upload Logo
              </span>
              <span className="text-gray-400 text-[9px] sm:text-[10px] mt-0.5 leading-tight">
                5mb image max size
              </span>
            </>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
        {/* Section 1: Institutional Registration */}
        <div className="flex flex-col gap-3.5">
          <h2 className="text-base sm:text-lg font-bold text-neutral-primary">
            Institutional Registration
          </h2>

          <Input
            label="Organization Name"
            placeholder="Type here"
            value={organizationName}
            error={errors.organizationName}
            onChange={(e) => {
              setOrganizationName(e.target.value);
              if (errors.organizationName) {
                setErrors((prev) => ({ ...prev, organizationName: "" }));
              }
            }}
            disabled={isSubmitting}
          />

          <Input
            label="Organization Type"
            placeholder="Type here"
            value={organizationType}
            error={errors.organizationType}
            onChange={(e) => {
              setOrganizationType(e.target.value);
              if (errors.organizationType) {
                setErrors((prev) => ({ ...prev, organizationType: "" }));
              }
            }}
            disabled={isSubmitting}
          />

          <Input
            label="Industry / Sector"
            placeholder="Type here"
            value={industrySector}
            error={errors.industrySector}
            onChange={(e) => {
              setIndustrySector(e.target.value);
              if (errors.industrySector) {
                setErrors((prev) => ({ ...prev, industrySector: "" }));
              }
            }}
            disabled={isSubmitting}
          />

          <Input
            label="Website(optional)"
            placeholder="Type here"
            value={website}
            error={errors.website}
            onChange={(e) => setWebsite(e.target.value)}
            disabled={isSubmitting}
          />
        </div>

        {/* Section 2: Primary Contact */}
        <div className="flex flex-col gap-3.5 pt-2">
          <h2 className="text-base sm:text-lg font-bold text-neutral-primary">
            Primary Contact
          </h2>

          <Input
            label="Contact Person Full Name"
            placeholder="Type here"
            value={contactPersonName}
            error={errors.contactPersonName}
            onChange={(e) => {
              setContactPersonName(e.target.value);
              if (errors.contactPersonName) {
                setErrors((prev) => ({ ...prev, contactPersonName: "" }));
              }
            }}
            disabled={isSubmitting}
          />

          <Input
            label="Official Position / Title"
            placeholder="Type here"
            value={officialPosition}
            error={errors.officialPosition}
            onChange={(e) => {
              setOfficialPosition(e.target.value);
              if (errors.officialPosition) {
                setErrors((prev) => ({ ...prev, officialPosition: "" }));
              }
            }}
            disabled={isSubmitting}
          />

          <Input
            label="Official Email Address"
            type="email"
            placeholder="Type here"
            value={officialEmail}
            error={errors.officialEmail}
            onChange={(e) => {
              setOfficialEmail(e.target.value);
              if (errors.officialEmail) {
                setErrors((prev) => ({ ...prev, officialEmail: "" }));
              }
            }}
            disabled={isSubmitting}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Type here"
            value={phoneNumber}
            error={errors.phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (errors.phoneNumber) {
                setErrors((prev) => ({ ...prev, phoneNumber: "" }));
              }
            }}
            disabled={isSubmitting}
          />
        </div>

        {/* Submit Button */}
        <div className="w-full pt-4">
          <Button
            type="submit"
            variant="amber"
            size="lg"
            fullWidth
            className="h-12 sm:h-13 text-white font-bold text-base sm:text-lg bg-[#f9a825] hover:bg-[#e0931b] transition-all shadow-md cursor-pointer rounded-xl"
            loading={isSubmitting}
          >
            Complete Registration
          </Button>
        </div>
      </form>
    </motion.div>
  );
};
