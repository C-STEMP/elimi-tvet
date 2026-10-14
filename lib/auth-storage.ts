const ACCESS_TOKEN_KEY = "elimi_access_token";
const REFRESH_TOKEN_KEY = "elimi_refresh_token";
const USER_KEY = "elimi_user";
const ONBOARDED_KEY = "elimi_onboarded";
const INSTITUTION_KEY = "elimi_institution_data";

export interface StoredUser {
  userId: string;
  email: string;
  status: "pending_verification" | "active" | "suspended";
  intents: string[];
  createdAt: string;
}

export interface InstitutionData {
  organizationName: string;
  organizationType: string;
  industrySector: string;
  website?: string;
  contactPersonName: string;
  officialPosition: string;
  officialEmail: string;
  phoneNumber: string;
  logoUrl?: string;
  logoName?: string;
  onboardedAt?: string;
}

export function saveTokens(accessToken: string, refreshToken: string): void {
  if (typeof window === "undefined") return;
  if (!accessToken || !refreshToken) return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  document.cookie = `${ACCESS_TOKEN_KEY}=${encodeURIComponent(accessToken)}; path=/; max-age=604800; SameSite=Lax`;
  document.cookie = `${REFRESH_TOKEN_KEY}=${encodeURIComponent(refreshToken)}; path=/; max-age=604800; SameSite=Lax`;
}

export function saveOnboardedStatus(isOnboarded: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ONBOARDED_KEY, String(isOnboarded));
  document.cookie = `${ONBOARDED_KEY}=${isOnboarded}; path=/; max-age=604800; SameSite=Lax`;
}

export function getOnboardedStatus(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(ONBOARDED_KEY) === "true";
}

export function saveInstitutionData(data: InstitutionData): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(INSTITUTION_KEY, JSON.stringify(data));
}

export function getInstitutionData(): InstitutionData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(INSTITUTION_KEY);
    return raw ? (JSON.parse(raw) as InstitutionData) : null;
  } catch {
    return null;
  }
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function saveUser(user: StoredUser): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function getUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

export function clearTokens(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(ONBOARDED_KEY);
  localStorage.removeItem(INSTITUTION_KEY);
  sessionStorage.clear();
  document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${REFRESH_TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
  document.cookie = `${ONBOARDED_KEY}=; path=/; max-age=0; SameSite=Lax`;
}

export function isAuthenticated(): boolean {
  return !!getAccessToken();
}
