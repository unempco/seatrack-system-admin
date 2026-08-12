import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { usePagination } from '@/core/hooks/use-pagination';

describe('usePagination', () => {
  it('calculates page metadata for the current page', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 95,
        pageSize: 10,
        currentPage: 3,
        siblingCount: 1,
      }),
    );

    expect(result.current.totalPages).toBe(10);
    expect(result.current.firstItem).toBe(21);
    expect(result.current.lastItem).toBe(30);
    expect(result.current.isFirst).toBe(false);
    expect(result.current.isLast).toBe(false);
  });

  it('shows all pages when total pages fit within the window', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 50,
        pageSize: 10,
        currentPage: 2,
        siblingCount: 1,
      }),
    );

    expect(result.current.pages).toEqual([1, 2, 3, 4, 5]);
  });

  it('inserts ellipsis for large page counts', () => {
    const { result } = renderHook(() =>
      usePagination({
        totalItems: 200,
        pageSize: 10,
        currentPage: 10,
        siblingCount: 1,
      }),
    );

    expect(result.current.pages).toEqual([1, '...', 9, 10, 11, '...', 20]);
    expect(result.current.hasDots('...')).toBe(true);
    expect(result.current.hasDots(10)).toBe(false);
  });

  it('marks first and last pages correctly', () => {
    const first = renderHook(() =>
      usePagination({
        totalItems: 30,
        pageSize: 10,
        currentPage: 1,
        siblingCount: 1,
      }),
    );
    const last = renderHook(() =>
      usePagination({
        totalItems: 30,
        pageSize: 10,
        currentPage: 3,
        siblingCount: 1,
      }),
    );

    expect(first.result.current.isFirst).toBe(true);
    expect(first.result.current.isLast).toBe(false);
    expect(last.result.current.isFirst).toBe(false);
    expect(last.result.current.isLast).toBe(true);
  });
});
