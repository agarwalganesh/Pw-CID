import { Category, CategoryDetailPayload, StudentProfile, FitmentResult, CounsellorPitchResponse } from '../types';
import {
  getCategoriesLocal,
  getCategoryDetailsLocal,
  calculateFitmentLocal,
  generatePitchLocal
} from '../services/dataService';

const API_BASE = '/api';

async function safeFetchJson<T>(url: string, options?: RequestInit): Promise<T | null> {
  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json();
      if (data && data.success) {
        return data.data as T;
      }
    }
  } catch (err) {
    // Network failure or backend not running
  }
  return null;
}

export async function getCategories(): Promise<Category[]> {
  const remoteData = await safeFetchJson<Category[]>(`${API_BASE}/categories`);
  if (remoteData && Array.isArray(remoteData) && remoteData.length > 0) {
    return remoteData;
  }
  return getCategoriesLocal();
}

export async function getCategoryDetails(idOrSlug: string): Promise<CategoryDetailPayload> {
  const remoteData = await safeFetchJson<CategoryDetailPayload>(`${API_BASE}/categories/${idOrSlug}`);
  if (remoteData && remoteData.category) {
    return remoteData;
  }
  return getCategoryDetailsLocal(idOrSlug);
}

export async function calculateFitment(profile: StudentProfile): Promise<FitmentResult> {
  const remoteData = await safeFetchJson<FitmentResult>(`${API_BASE}/fitment/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  });
  if (remoteData && remoteData.overall_fitment_score !== undefined) {
    return remoteData;
  }
  return calculateFitmentLocal(profile);
}

export async function generatePitch(profile: StudentProfile, fitment: FitmentResult): Promise<CounsellorPitchResponse> {
  const remoteData = await safeFetchJson<CounsellorPitchResponse>(`${API_BASE}/pitch/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, fitment })
  });
  if (remoteData && remoteData.pitch_sections) {
    return remoteData;
  }
  return generatePitchLocal(profile, fitment);
}
