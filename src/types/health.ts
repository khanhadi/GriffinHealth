// src/types/health.ts
import type { LucideIcon } from 'lucide-react';

export interface HealthMetric {
  value: string | number;
  startDate: string;
  endDate: string;
}

export interface HealthData {
  heart_rate: HealthMetric[];
  distance_walking_running: HealthMetric[];
  steps: HealthMetric[];
  respiratory_rate: HealthMetric[];
  audio_exposure: HealthMetric[];
  awake_duration: HealthMetric[];
  core_duration: HealthMetric[];
  deep_duration: HealthMetric[];
  rem_duration: HealthMetric[];
}

export interface MetricStatistics {
  average: string;
  min: number;
  max: number;
  total: string;
  unit?: string;
}

export interface AnalysisResult {
  specialty: string;
  statistics: Record<string, MetricStatistics>;
  comments: string[];
}

export interface AnalysisResponse {
  results: AnalysisResult[];
  summary: string;
}

export interface SpecialistAgent {
  role: string;
  metrics: string[];
}

export type SpecialistAgents = Record<string, SpecialistAgent>;

export const SPECIALTY_KEYS = [
  'CARDIAC',
  'SLEEP',
  'ACTIVITY',
  'RESPIRATORY',
  'AUDIO',
] as const;

export type SpecialtyKey = (typeof SPECIALTY_KEYS)[number];

export interface SpecialtyConfig {
  title: string;
  icon: LucideIcon;
}

export type SpecialtyConfigs = Record<SpecialtyKey, SpecialtyConfig>;
