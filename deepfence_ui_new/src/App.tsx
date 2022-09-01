import { ColumnDef } from '@tanstack/react-table';
import { Fragment, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import Button from './components/button/Button';
import { Card } from './components/card/Card';
import { Checkbox } from './components/checkbox/Checkbox';
import { TextInput } from './components/input/TextInput';
import { Label } from './components/label/Label';
import { Radio } from './components/radio/Radio';
import RadixRadio from './components/radix-ui/RadioGroup';
import Table from './components/table/CommonTable';
import { ToggleSwitch } from './components/toggle-switch/ToggleSwitch';
import theme from './theme/default';
import { ThemeProvider } from './theme/ThemeContext';

const queryClient = new QueryClient();

const columns2: ColumnDef<any>[] = [
  {
    header: '',
    accessorKey: 'cloudId',
    cell: ({ row, getValue }) => {
      return (
        <>
          {row.getCanExpand() ? (
            <button onClick={row.getToggleExpandedHandler()} className="font-thin">
              {row.getIsExpanded() ? 'CLOSE' : 'EXPAND'}
            </button>
          ) : (
            ''
          )}

          {getValue()}
        </>
      );
    },
    footer: (props) => props.column.id,
    enableResizing: true,
    size: 150,
  },
  {
    accessorFn: (row) => row.cloudType,
    id: 'cloudType',
    cell: (info) => info.getValue(),
    header: () => <span></span>,
    enableResizing: true,
  },
];

const columns3: ColumnDef<any>[] = [
  {
    header: ({ table }) => (
      <div>
        <>
          <button onClick={table.getToggleAllRowsExpandedHandler()}>
            {table.getIsAllRowsExpanded() ? 'CLOSE' : 'EXPAND'}
          </button>
          Account Id
        </>
      </div>
    ),
    accessorKey: 'accid',
    cell: ({ row, getValue }) => {
      return (
        <>
          {row.getCanExpand() ? (
            <button onClick={row.getToggleExpandedHandler()}>
              {row.getIsExpanded() ? 'CLOSE' : 'EXPAND'}
            </button>
          ) : (
            ''
          )}

          {getValue()}
        </>
      );
    },
    footer: (props) => props.column.id,
    enableResizing: true,
  },
  {
    accessorFn: (row) => row.cp,
    id: 'cp',
    cell: (info) => info.getValue(),
    header: () => <span>Cloud Provider</span>,
    enableResizing: true,
  },
  {
    header: () => (
      <div>
        <>
          {/* <button onClick={table.getToggleAllRowsExpandedHandler()}>
            {table.getIsAllRowsExpanded() ? 'CLOSE' : 'EXPAND'}
          </button> */}
          Add1
        </>
      </div>
    ),
    accessorKey: 'add1',
    cell: ({ getValue }) => {
      return (
        <>
          {/* {row.getCanExpand() ? (
            <button onClick={row.getToggleExpandedHandler()}>
              {row.getIsExpanded() ? 'CLOSE' : 'EXPAND'}
            </button>
          ) : (
            ''
          )} */}

          {getValue()}
        </>
      );
    },
    enableResizing: true,
  },
  {
    accessorFn: (row) => row.add2,
    id: 'add2',
    cell: (info) => info.getValue(),
    header: () => <span>Add2</span>,
    enableResizing: true,
  },
  {
    accessorFn: (row) => row.add3,
    id: 'add3',
    cell: (info) => info.getValue(),
    header: () => <span>Add3</span>,
    enableResizing: true,
  },
  {
    accessorFn: (row) => row.add4,
    id: 'add4',
    cell: (info) => info.getValue(),
    header: () => <span>Add4</span>,
    enableResizing: true,
  },
];

const columns: ColumnDef<any>[] = [
  {
    header: ({ table }) => (
      <div>
        <>
          <button onClick={table.getToggleAllRowsExpandedHandler()} className="font-thin">
            {table.getIsAllRowsExpanded() ? 'CLOSE' : 'EXPAND'}
          </button>
          Name
        </>
      </div>
    ),
    accessorKey: 'accid',
    cell: ({ row, getValue }) => {
      return (
        <>
          {row.getCanExpand() ? (
            <button onClick={row.getToggleExpandedHandler()} className="font-thin">
              {row.getIsExpanded() ? 'CLOSE' : 'EXPAND'}
            </button>
          ) : (
            ''
          )}

          {getValue()}
        </>
      );
    },
    footer: (props) => props.column.id,
    enableResizing: true,
    size: 150,
    minSize: 150,
    // minSize: 400,
  },
  {
    accessorFn: (row) => row.cp,
    id: 'cp',
    cell: (info) => info.getValue(),
    header: () => <span>Type</span>,
    footer: (props) => props.column.id,
    enableResizing: true,
    minSize: 150,
  },
  {
    accessorKey: 'active',
    header: () => 'Active',
    footer: (props) => props.column.id,
    enableResizing: true,
    minSize: 150,
  },
  {
    accessorKey: 'percentage',
    header: () => <span>Compliance</span>,
    footer: (props) => props.column.id,
    enableResizing: true,
    minSize: 150,
  },
];

const data = [
  {
    accid: '11111',
    cp: '20%',
    percentage: 31.76803394625177,
    active: true,
    subRow: [
      {
        cloudId: 'AWS',
        cloudType: 'AWS Type1',
        subRow: [
          {
            accid: '99999',
            cp: '30%',
            add1: 'First Row Address 1',
            add2: 'First Row Address 2',
            add3: 'First Row Address 3',
            add4: 'First Row Address 4',
          },
        ],
      },
    ],
  },
  {
    accid: '222222',
    cp: '30%',
    percentage: 31.76803394625177,
    active: true,
    subRow: [
      {
        cloudId: 'AWS',
        cloudType: 'AWS Type1',
      },
    ],
  },
  {
    accid: '333333',
    cp: '40%',
    percentage: 31.76803394625177,
    active: true,
    subRow: [
      {
        cloudId: 'AWS',
        cloudType: 'AWS Type1',
      },
    ],
  },
];

const Table2 = ({ row }: any) => {
  console.log('table 2 row:', row);
  return (
    <Table
      data={row?.original.subRow || []}
      columns={columns3}
      config={{
        isFullWidth: false,
        isResizableColumn: false,
        sortableColumn: {
          isSortable: true,
          columns: ['accid'],
        },
        pagination: {
          isPagination: false,
          placement: 'right-top',
        },
        selectable: {
          isSelectable: true,
          placement: 'end',
        },
        expanded: {
          isRowExpanded: false,
          column: 'subRow',
        },
        onRowClick: (row: any) => {
          console.log('On Row Click:', row);
        },
      }}
      renderRowSubComponent={({ row }: any) => <Table2 row={row} />}
    />
  );
};

const SubRowComponent = ({ row }: any) => {
  console.log('SubRowComponent:', row);
  return (
    <Table
      data={row?.original.subRow}
      columns={columns2}
      config={{
        isFullWidth: false,
        isResizableColumn: false,
        sortableColumn: {
          isSortable: false,
          columns: ['accid'],
        },
        pagination: {
          isPagination: false,
          placement: 'right-top',
        },
        selectable: {
          isSelectable: false,
          placement: 'end',
        },
        expanded: {
          isRowExpanded: true,
          column: 'subRow',
        },
        onRowClick: (row: any) => {
          console.log('On Row Click:', row);
        },
      }}
      renderRowSubComponent={({ row }: any) => <Table2 row={row} />}
    />
  );
};
export const TableTest = () => (
  <Table
    data={data}
    columns={columns}
    config={{
      isFullWidth: true,
      isResizableColumn: true,
      sortableColumn: {
        isSortable: true,
        columns: ['accid'],
      },
      pagination: {
        isPagination: true,
        placement: 'right-top',
      },
      selectable: {
        isSelectable: true,
        placement: 'end',
      },
      expanded: {
        isRowExpanded: true,
        column: 'subRow',
      },
      onRowClick: (row: any) => {
        console.log('On Row Click:', row);
      },
    }}
    renderRowSubComponent={({ row }: any) => <SubRowComponent row={row} />}
  />
);

function App() {
  const [toggleSwitch, setToggleSwitch] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={{ theme }}>
        <div
          style={{
            padding: 20,
          }}
        >
          {/* <Example />
        <TableTest /> */}
          <Button color={'light'} size="xs" label="2">
            Profile
          </Button>

          <TextInput
            placeholder="name@flowbite.com"
            required={true}
            icon={() => <span>hi</span>}
            addon="@"
            helperText={
              <Fragment>
                <span className="font-medium">Alright!</span> Username available!
              </Fragment>
            }
            shadow={true}
            type="text"
            sizing="lg"
          />
          <div className="flex items-center py-2 gap-2">
            <Checkbox id="disabled" disabled={true} />
            <Label htmlFor="disabled" disabled={true}>
              Eligible for international shipping (disabled)
            </Label>
          </div>
          <div className="flex items-center py-2 gap-2">
            <Radio id="united-state" name="countries" value="USA" defaultChecked={true} />
            <Label htmlFor="united-state">United States</Label>
          </div>
          <div className="flex items-center py-2 gap-2">
            <Radio id="germany" name="countries" value="Germany" />
            <Label htmlFor="germany">Germany</Label>
          </div>
          <div className="flex flex-col gap-4" id="toggle">
            <ToggleSwitch
              checked={toggleSwitch}
              label="Toggle me"
              onChange={() => setToggleSwitch(!toggleSwitch)}
            />
            <ToggleSwitch
              checked={toggleSwitch}
              label="Toggle me (checked)"
              onChange={() => 'Changed'}
            />
            <ToggleSwitch
              checked={toggleSwitch}
              disabled={true}
              label="Toggle me (disabled)"
              onChange={() => setToggleSwitch(!toggleSwitch)}
            />
          </div>
          <Card>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in
              reverse chronological order.
            </p>
            <Button>
              Read more
              <svg
                className="ml-2 -mr-1 h-4 w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </Card>
          <RadixRadio />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
