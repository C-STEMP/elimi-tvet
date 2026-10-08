"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/toast";
import {
  SettingsTab,
  OrganizationSettingsFormData,
  SecurityFormData,
} from "../types/settings.types";
import { SettingsSidebar } from "../components/SettingsSidebar";
import { OrganizationInfoTab } from "../components/OrganizationInfoTab";
import { SecurityTab } from "../components/SecurityTab";
import { StatusModal } from "@/components/ui/status-modal";
import { DeleteAccountModal } from "../components/DeleteAccountModal";
import { SuccessModal } from "../components/SuccessModal";

export const SettingsView: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState<OrganizationSettingsFormData>({
    organizationName: "C-STEMP Construction Academy",
    organizationType: "Vocational & TVET Assessment Centre",
    industrySector: "Construction & Building Services",
    website: "https://cstemp.org",
    emailAddress: "info@cstemp.org",
    officialPosition: "Managing Director / Provost",
    officialEmailAddress: "provost@cstemp.org",
    phoneNumber: "+234 803 555 0192",
    inAppNotifications: true,
    emailNotifications: true,
    sessionReminders: false,
  });

  const [securityForm, setSecurityForm] = useState<SecurityFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleFieldChange = (
    field: keyof OrganizationSettingsFormData,
    value: any
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSecurityChange = (
    field: keyof SecurityFormData,
    value: string
  ) => {
    setSecurityForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogoChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setLogoSrc(url);
    toast({
      type: "success",
      title: "Logo Updated",
      description: "Organization logo updated successfully.",
    });
  };

  const handleSaveProfile = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        type: "success",
        title: "Settings Saved",
        description: "Organization details updated successfully.",
      });
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="w-full flex flex-col"
    >
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
        {/* Left Sidebar */}
        <SettingsSidebar
          logoSrc={logoSrc}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenDeleteModal={() => setIsDeleteModalOpen(true)}
          onLogoChange={handleLogoChange}
        />

        {/* Right Active Tab Content */}
        <main className="flex-1 w-full min-w-0">
          {activeTab === "profile" ? (
            <OrganizationInfoTab
              formData={formData}
              onChange={handleFieldChange}
              onSave={handleSaveProfile}
              isSaving={isSaving}
            />
          ) : (
            <SecurityTab
              status="verified"
              onVerifyNow={() =>
                toast({
                  type: "info",
                  title: "CAC Verification",
                  description: "CAC verification portal will open.",
                })
              }
              securityFormData={securityForm}
              onChangeSecurityForm={handleSecurityChange}
              onPasswordChangeSuccess={() => setIsSuccessModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* Delete Account Modal */}
      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirmDelete={(_pwd) => {
          setIsDeleteModalOpen(false);
          setIsConfirmDeleteOpen(true);
        }}
      />

      {/* Confirmation Status Modal */}
      <StatusModal
        isOpen={isConfirmDeleteModalOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        type="error"
        title="Confirm Account Deletion"
        description="Are you sure you want to permanently delete your organization account? All workforce cohorts, trainee records, and transaction histories will be removed."
        actionLabel="Yes, Delete Account"
        onAction={() => {
          setIsConfirmDeleteOpen(false);
          toast({
            type: "error",
            title: "Account Deleted",
            description: "Your organization account has been deleted.",
          });
          router.push("/login");
        }}
      />

      {/* Success Modal for Password Change */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
    </motion.div>
  );
};
