import type { DateFormat } from '@/core/constants/dates';
import { dateFormatValue } from '@/core/constants/dates';

export type TimeFormat = '12h' | '24h';

export type TimeSettings = {
  timeZone: string;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
};

const SETTINGS_STORAGE_KEY = 'preferences.app.timeSettings';

export const supportedTimeZones = [
  'UTC',
  'America/Tijuana',
  'America/New_York',
  'Europe/London',
  'Asia/Tokyo',
] as const;

export const supportedDateFormats = [
  dateFormatValue.intAbbr,
  dateFormatValue.usAbbr,
  dateFormatValue.iso,
] as const;

export const supportedTimeFormats = ['12h', '24h'] as const;

const defaultTimeSettings: TimeSettings = {
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'UTC',
  dateFormat: dateFormatValue.intAbbr,
  timeFormat: '12h',
};

export function getUserTimeSettings(): TimeSettings {
  try {
    const rawSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!rawSettings) return defaultTimeSettings;

    const parsed = JSON.parse(rawSettings) as Partial<TimeSettings> | null;

    return {
      ...defaultTimeSettings,
      ...parsed,
    };
  } catch {
    return defaultTimeSettings;
  }
}

export function setUserTimeSettings(settings: TimeSettings) {
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}
