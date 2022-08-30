import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
// eslint-disable-next-line
export type OnRowSelectFunction = (row: any, selected: any[]) => void;
// eslint-disable-next-line
export type OnRowClickFunction = (row: any) => void;

export const PLACEMENT = {
  PAGINATION: {
    LEFT_BOTTOM: 'left-bottom',
    LEFT_TOP: 'left-top',
    RIGHT_BOTTOM: 'right-bottom',
    RIGHT_TOP: 'right-top',
  },
  SELECTABLE: {
    START: 'start',
    END: 'end',
  },
};

export type PaginationPlacement =
  | 'left-bottom'
  | 'right-bottom'
  | 'left-top'
  | 'right-top';
type SelectablePlacement = 'start' | 'end';

export type TableProps = {
  data: any;
  columns: ColumnDef<any>[];
  config?: {
    isFullWidth?: boolean;
    isResizableColumn?: boolean;
    sortableColumn?: {
      isSortable: boolean;
      columns?: string[];
    };
    pagination?: {
      isPagination: boolean;
      placement: PaginationPlacement;
    };
    selectable?: {
      isSelectable: boolean;
      placement: SelectablePlacement;
      onSelect?: OnRowSelectFunction;
    };
    expanded?: {
      isRowExpanded: true;
      column: string;
    };
    onRowClick?: OnRowClickFunction;
  };
  // eslint-disable-next-line
  renderRowSubComponent: JSX.Element | React.ReactNode;
};

type Ctx = any;
export type PaginationProps = {
  ctx: Ctx;
  isPlacement: boolean;
};

export type TableBodyProps = {
  ctx: Ctx;
  renderRowSubComponent: any;
};

export type TableHeaderProps = {
  ctx: Ctx;
};

export type TableContextProps = React.Context<{
  state: TableProps['config'];
  update: Function;
}>;
