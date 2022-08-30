import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import classname from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import { createCtx } from '../hooks/useContextProvider';
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { Pagination } from './TablePagination';
import { PaginationPlacement, PLACEMENT, TableProps } from './types';

const Table = (props: TableProps) => {
  const { columns, data, renderRowSubComponent } = props;
  let { config } = props;
  if (config === undefined) {
    config = {};
  }
  const { isFullWidth, expanded } = config;
  let { pagination } = config;
  if (pagination === undefined) {
    pagination = {
      isPagination: false,
      placement: PLACEMENT.PAGINATION.RIGHT_BOTTOM as PaginationPlacement,
    };
  }

  const [rowSelection, setRowSelection] = useState({});
  const [rowExpanded, setRowExpanded] = useState<ExpandedState>({});
  const [sorting, setSorting] = useState<SortingState>([]);

  /**
   * Select all header memoize
   */
  const selectColumns = useMemo<ColumnDef<typeof columns>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              /**
               * Need onChange event to call callback props
               */
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
    ],
    [],
  );
  /**
   * add select all header option either at begining or end of table
   * base on given placement type
   */
  const [tableColumns] = useState<typeof columns>(() => {
    if (config?.selectable && config?.selectable.isSelectable) {
      if (config?.selectable.placement === PLACEMENT.SELECTABLE.START) {
        return [...selectColumns, ...columns];
      } else if (config?.selectable.placement === PLACEMENT.SELECTABLE.END) {
        return columns.concat(selectColumns);
      }
    }
    return columns;
  });

  const [paginationPosition, setPaginationPosition] = useState({
    bottom: false,
    top: false,
  });
  const { isPagination, placement } = pagination;

  useEffect(() => {
    if (isPagination) {
      if (
        placement === PLACEMENT.PAGINATION.RIGHT_TOP ||
        placement === PLACEMENT.PAGINATION.LEFT_TOP
      ) {
        setPaginationPosition({
          top: true,
          bottom: false,
        });
      } else if (
        placement === PLACEMENT.PAGINATION.LEFT_BOTTOM ||
        placement === PLACEMENT.PAGINATION.RIGHT_BOTTOM
      ) {
        setPaginationPosition({
          bottom: true,
          top: false,
        });
      }
    }
  }, [pagination]);

  const [columnData] = useState<typeof data>(data);

  const table = useReactTable({
    data: columnData,
    columns: tableColumns,
    state: {
      rowSelection,
      sorting,
      expanded: rowExpanded,
    },
    onRowSelectionChange: setRowSelection,
    onExpandedChange: setRowExpanded,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSubRows: (row: typeof data[0]) => {
      if (!expanded || !expanded.isRowExpanded || !expanded.column) {
        return undefined;
      }
      return row[expanded.column];
    },
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    debugTable: true,
    enableSorting: true,
  });

  const [ctx, TableProvider] = createCtx({
    columns: tableColumns,
    isFullWidth,
    table,
    ...config,
  });

  if (!(columns instanceof Array)) {
    console.error('Table columns must be of type array');
    return null;
  }

  if (!(data instanceof Array)) {
    console.error('Table data must be of type array');
    return null;
  }

  return (
    <TableProvider>
      <div className={classname('w-full overflow-x-scroll overflow-y-hidden')}>
        {isPagination && paginationPosition.top && (
          <Pagination
            ctx={ctx}
            isPlacement={placement === PLACEMENT.PAGINATION.RIGHT_TOP}
          />
        )}
        <table
          className={classname(
            'w-full overflow-x-scroll text-sm text-left text-gray-500',
          )}
          style={{
            width: !isFullWidth ? `${table.getTotalSize()}px` : '',
          }}
        >
          <TableHeader ctx={ctx} />
          <TableBody ctx={ctx} renderRowSubComponent={renderRowSubComponent} />
        </table>

        {isPagination && paginationPosition.bottom && (
          <Pagination
            ctx={ctx}
            isPlacement={placement === PLACEMENT.PAGINATION.RIGHT_BOTTOM}
          />
        )}
      </div>
    </TableProvider>
  );
};

export default Table;
