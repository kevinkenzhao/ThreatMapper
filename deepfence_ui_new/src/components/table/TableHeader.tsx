import { flexRender } from '@tanstack/react-table';
import classname from 'classnames';
import { memo, useContext } from 'react';

import { TableHeaderProps } from './types';

const Sortable = memo(({ header, ...rest }: any) => {
  const { column } = header;
  if (rest.columns.includes(column.id)) {
    return (
      // eslint-disable-next-line
      <div
        className={classname(
          'cursor-pointer select-none absolute right-5 top-0 flex font-thin',
        )}
        onClick={column.getToggleSortingHandler()}
      >
        SORT
        {{
          asc: ' 🔼',
          desc: ' 🔽',
        }[column.getIsSorted() as string] ?? null}
      </div>
    );
  }
  return null;
});

const Resizable = memo(({ header, state }: any) => {
  const { column } = header;
  return (
    // eslint-disable-next-line
    <div
      className={classname(
        'absolute w-2 h-full cursor-col-resize right-1 top-0 touch-none select-none font-thin',
        {
          'bg-gray-400': column.getIsResizing(),
          [`translate-x-[${state.columnSizingInfo.deltaOffset}px]`]:
            column.getIsResizing(),
        },
      )}
      onMouseDown={header.getResizeHandler()}
      onTouchStart={header.getResizeHandler()}
    >
      &nbsp;
    </div>
  );
});

export function TableHeader(props: TableHeaderProps) {
  const { state } = useContext(props.ctx);

  const { isFullWidth, isResizableColumn, sortableColumn = {}, table } = state;
  const { isSortable } = sortableColumn;

  const { getHeaderGroups, getState } = table;
  const headerGroups = getHeaderGroups();

  return (
    <thead className={classname('text-xs text-gray-700 uppercase bg-gray-50')}>
      {headerGroups.map((headerGroup: any) => {
        return (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header: any) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{ width: header.getSize() }}
                className={classname('relative')}
              >
                {header.isPlaceholder ? null : (
                  <>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {
                      <div className="flex-row">
                        {isSortable && header.column.getCanSort() && (
                          <Sortable header={header} {...sortableColumn} />
                        )}
                        {isResizableColumn && header.column.getCanResize() && (
                          <Resizable
                            state={getState()}
                            header={header}
                            isFullWidth={isFullWidth}
                          />
                        )}
                      </div>
                    }
                  </>
                )}
              </th>
            ))}
          </tr>
        );
      })}
    </thead>
  );
}
