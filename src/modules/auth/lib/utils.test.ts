import { describe, expect, it } from 'vitest';

import { validator } from '@/modules/auth/lib/utils';

describe('permission validator', () => {
  const userPermissions = ['Dummies.Read', 'Dummies.Write'];

  it('allows access when no requirements are provided', () => {
    expect(validator(undefined, userPermissions)).toBe(true);
  });

  it('denies access when the user has no permissions', () => {
    expect(validator('Dummies.Read', undefined)).toBe(false);
  });

  it('matches a single required permission', () => {
    expect(validator('Dummies.Read', userPermissions)).toBe(true);
    expect(validator('Dummies.Delete', userPermissions)).toBe(false);
  });

  it('matches any permission by default', () => {
    expect(validator(['Dummies.Read', 'Dummies.Delete'], userPermissions)).toBe(
      true,
    );
    expect(
      validator(['Dummies.Delete', 'Dummies.Modify'], userPermissions),
    ).toBe(false);
  });

  it('requires all permissions when requireAll is true', () => {
    expect(
      validator(['Dummies.Read', 'Dummies.Write'], userPermissions, true),
    ).toBe(true);
    expect(
      validator(['Dummies.Read', 'Dummies.Delete'], userPermissions, true),
    ).toBe(false);
  });
});
