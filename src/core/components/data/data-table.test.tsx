import type { ColumnDef } from '@tanstack/react-table';

import userEvent from '@testing-library/user-event';
import { screen, within } from '@testing-library/react';
import { useState } from 'react';
import { describe, expect, it } from 'vitest';

import { DataTable } from '@/core/components/data/data-table';
import { renderWithProviders } from '@/test/utils';

type Row = { id: number; name: string };

const columns: ColumnDef<Row>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <input
        type="checkbox"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        aria-label={`Select row ${row.original.name}`}
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
      />
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ getValue }) => getValue<string>(),
  },
];

function DataTableHarness({
  data,
  withSelection = false,
}: {
  data: Row[];
  withSelection?: boolean;
}) {
  const [selectedItems, setSelectedItems] = useState<Row[]>([]);

  return (
    <>
      <DataTable
        data={data}
        columns={columns}
        columnVisibility={{}}
        setColumnVisibility={() => undefined}
        selectedItems={withSelection ? selectedItems : undefined}
        setSelectedItems={withSelection ? setSelectedItems : undefined}
      />
      {withSelection && (
        <div data-testid="selected-count">{selectedItems.length}</div>
      )}
    </>
  );
}

describe('DataTable', () => {
  it('renders rows from the provided data', () => {
    renderWithProviders(
      <DataTableHarness
        data={[
          { id: 1, name: 'Alpha' },
          { id: 2, name: 'Beta' },
        ]}
      />,
    );

    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('shows an empty state when there is no data', () => {
    renderWithProviders(<DataTableHarness data={[]} />);

    expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    expect(screen.getByText(/try removing all filters/i)).toBeInTheDocument();
  });

  it('syncs selected rows to the parent selectedItems state', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <DataTableHarness
        withSelection
        data={[
          { id: 1, name: 'Alpha' },
          { id: 2, name: 'Beta' },
        ]}
      />,
    );

    await user.click(screen.getByRole('checkbox', { name: /select row alpha/i }));

    expect(screen.getByTestId('selected-count')).toHaveTextContent('1');
  });

  it('selects all rows on the current page', async () => {
    const user = userEvent.setup();

    renderWithProviders(
      <DataTableHarness
        withSelection
        data={[
          { id: 1, name: 'Alpha' },
          { id: 2, name: 'Beta' },
        ]}
      />,
    );

    await user.click(screen.getByRole('checkbox', { name: /select all rows/i }));

    expect(screen.getByTestId('selected-count')).toHaveTextContent('2');
  });

  it('uses accessible table semantics', () => {
    renderWithProviders(
      <DataTableHarness data={[{ id: 1, name: 'Alpha' }]} />,
    );

    const table = screen.getByRole('table');
    expect(within(table).getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(within(table).getByRole('cell', { name: 'Alpha' })).toBeInTheDocument();
  });
});
