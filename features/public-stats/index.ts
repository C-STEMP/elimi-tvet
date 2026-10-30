import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { unwrap } from "@/lib/api/client";

export interface CapPublicStats {
  generatedAt: string;
  catalogue: {
    sectors: number;
    trades: {
      total: number;
      active: number;
    };
    qualificationLevels: number;
    units: number;
  };
  centres: {
    total: number;
    byStatus: {
      pending: number;
      approved: number;
      suspended: number;
      rejected: number;
    };
  };
  candidates: {
    registered: number;
    certified: number;
  };
  applications: {
    total: number;
    byType: {
      RPL: number;
      NSQ: number;
    };
    byStatus: {
      draft: number;
      submitted: number;
      in_progress: number;
      certified: number;
      rejected: number;
    };
  };
  certificates: {
    issued: number;
    revoked: number;
  };
  assessors: {
    total: number;
    active: number;
  };
}

export interface LmsPublicStats {
  generatedAt: string;
  learners: {
    total: number;
    byStatus: {
      active: number;
      suspended: number;
      deactivated: number;
    };
    byTrack: {
      vocational: number;
      professional: number;
      both: number;
    };
  };
  unitOfferings: {
    total: number;
    byStatus: {
      draft: number;
      published: number;
      archived: number;
    };
  };
  levelOfferings: {
    total: number;
    byStatus: {
      draft: number;
      published: number;
      archived: number;
    };
  };
  standaloneCourses: {
    total: number;
    byStatus: {
      draft: number;
      published: number;
      archived: number;
    };
  };
  enrollments: {
    total: number;
    byStatus: {
      enrolled: number;
      in_progress: number;
      completed: number;
      failed: number;
    };
    completionRate: number | null;
  };
  certificates: {
    issued: number;
  };
}

const CAP_BASE_URL =
  process.env.NEXT_PUBLIC_CAP_API_URL ||
  "https://www.staging-api.elimi-ecosystem.e-limi.africa/v1/cap";

const LMS_BASE_URL =
  process.env.NEXT_PUBLIC_LMS_API_URL ||
  "https://www.staging-api.elimi-ecosystem.e-limi.africa/v1/lms";

const publicHttp = axios.create({
  headers: { "Content-Type": "application/json" },
});

export function getCapPublicStats(): Promise<CapPublicStats> {
  return unwrap<CapPublicStats>(
    publicHttp.get(`${CAP_BASE_URL}/public/stats`),
  );
}

export function getLmsPublicStats(): Promise<LmsPublicStats> {
  return unwrap<LmsPublicStats>(
    publicHttp.get(`${LMS_BASE_URL}/public/stats`),
  );
}

const STALE_TIME_MS = 5 * 60 * 1000;

export function useCapPublicStats() {
  return useQuery<CapPublicStats>({
    queryKey: ["public-stats", "cap"],
    queryFn: getCapPublicStats,
    staleTime: STALE_TIME_MS,
    retry: 1,
  });
}

export function useLmsPublicStats() {
  return useQuery<LmsPublicStats>({
    queryKey: ["public-stats", "lms"],
    queryFn: getLmsPublicStats,
    staleTime: STALE_TIME_MS,
    retry: 1,
  });
}
