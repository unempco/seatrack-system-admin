import { describe, expect, it } from 'vitest';

import {
  getColumnsPreference,
  getViewModePreference,
  setColumnsPreference,
  setViewModePreference,
} from '@/core/lib/data-view';

describe('data-view preferences', () => {
  const namespace = 'test-module';

  it('persists and restores column visibility preferences', () => {
    setColumnsPreference(namespace, { name: false, email: true });

    expect(getColumnsPreference(namespace)).toEqual({
      name: false,
      email: true,
    });
  });

  it('returns default column preferences when storage is missing or invalid', () => {
    expect(getColumnsPreference(namespace, { name: true })).toEqual({
      name: true,
    });

    localStorage.setItem('preferences.test-module.columns', 'not-json');
    expect(getColumnsPreference(namespace, { name: true })).toEqual({
      name: true,
    });
  });

  it('persists and restores view mode preferences', () => {
    setViewModePreference(namespace, 'grid');
    expect(getViewModePreference(namespace)).toBe('grid');
  });

  it('falls back to default view mode for invalid stored values', () => {
    localStorage.setItem('preferences.test-module.viewMode', 'invalid');
    expect(getViewModePreference(namespace, 'table')).toBe('table');
  });
});
