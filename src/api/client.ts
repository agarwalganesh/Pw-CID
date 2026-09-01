import { Category, CategoryDetailPayload, StudentProfile, FitmentResult, CounsellorPitchResponse } from '../types';

const API_BASE = '/api';

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE}/categories`);
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch categories');
  }
  return data.data;
}

export async function getCategoryDetails(idOrSlug: string): Promise<CategoryDetailPayload> {
  const response = await fetch(`${API_BASE}/categories/${idOrSlug}`);
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to fetch category details');
  }
  return data.data;
}

export async function calculateFitment(profile: StudentProfile): Promise<FitmentResult> {
  const response = await fetch(`${API_BASE}/fitment/calculate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to calculate fitment');
  }
  return data.data;
}

export async function generatePitch(profile: StudentProfile, fitment: FitmentResult): Promise<CounsellorPitchResponse> {
  const response = await fetch(`${API_BASE}/pitch/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile, fitment })
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Failed to generate counsellor pitch');
  }
  return data.data;
}
