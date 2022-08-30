import { flexRender } from '@tanstack/react-table';
import classname from 'classnames';
import { Fragment, useContext } from 'react';

import { TableBodyProps } from './types';

export function TableBody(props: TableBodyProps) {
  const { ctx, renderRowSubComponent } = props;
  const { state } = useContext(ctx);

  const { table, onRowClick } = state;
  const { getRowModel } = table;
  const rows = getRowModel().rows;
  return (
    <tbody>
      {rows.map((row: any) => {
        return (
          <Fragment key={row.key}>
            <tr
              key={row.id}
              className={classname(
                'bg-white border-b hover:bg-gray-50',
                'dark:bg-gray-800 dark:hover:bg-gray-600 dark:border-gray-700',
              )}
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map((cell: any) => {
                return (
                  <td key={cell.id} className={classname('p-4 w-4')}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
            {row.getIsExpanded() && renderRowSubComponent && (
              <tr>
                <td colSpan={row.getVisibleCells().length}>
                  {renderRowSubComponent({ row })}
                </td>
              </tr>
            )}
          </Fragment>
        );
      })}
    </tbody>
  );
}
