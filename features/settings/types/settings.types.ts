export type SettingsTab = "profile" | "security";

export type VerificationStatus = "verified" | "not_verified";

export interface OrganizationSettingsFormData {
  // Organization Details
  organizationName: string;
  organizationType: string;
  industrySector: string;
  website: string;

  // Primary Contact
  emailAddress: string;
  officialPosition: string;
  officialEmailAddress: string;
  phoneNumber: string;

  // Notification Preference
  inAppNotifications: boolean;
  emailNotifications: boolean;
  sessionReminders: boolean;
}

export interface ProfileFormData {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: string;
  gender: string;
  nationality: string;
  email: string;
  phone: string;
  country: string;
  stateOfResidence: string;
  lga: string;
  residentialAddress: string;
  impairment: string;
  emailNotifications: boolean;
  sessionReminders: boolean;
}

export interface SecurityFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface TransactionReceiptData {
  id: string;
  candidateName: string;
  assessmentType: string;
  amountPaid: string;
  status: "Paid" | "Pending" | "Completed";
  date: string;
  transactionId: string;
  paymentMethod: string;
  description: string;
  cohortName?: string;
  programModel?: string;
}
