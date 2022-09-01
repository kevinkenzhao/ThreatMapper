import { Theme } from './Theme';

const theme: Theme = {
  button: {
    base: 'group flex h-min w-fit items-center justify-center p-0.5 text-center font-medium focus:z-10',
    color: {
      dark: 'text-white bg-gray-800 border border-transparent hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 disabled:hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700 dark:disabled:hover:bg-gray-800',
      failure:
        'text-white bg-red-700 border border-transparent hover:bg-red-800 focus:ring-4 focus:ring-red-300 disabled:hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 dark:disabled:hover:bg-red-600',
      gray: 'text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 disabled:hover:bg-white focus:ring-blue-700 focus:text-blue-700 dark:bg-transparent dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-2 dark:disabled:hover:bg-gray-800',
      info: 'text-white bg-blue-700 border border-transparent hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:disabled:hover:bg-blue-600',
      light:
        'text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-300 disabled:hover:bg-white dark:bg-gray-600 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700',
      purple:
        'text-white bg-purple-700 border border-transparent hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 disabled:hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 dark:disabled:hover:bg-purple-600',
      success:
        'text-white bg-green-700 border border-transparent hover:bg-green-800 focus:ring-4 focus:ring-green-300 disabled:hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 dark:disabled:hover:bg-green-600',
      warning:
        'text-white bg-yellow-400 border border-transparent hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 disabled:hover:bg-yellow-400 dark:focus:ring-yellow-900 dark:disabled:hover:bg-yellow-400',
    },
    disabled: 'cursor-not-allowed opacity-50',
    inner: {
      base: 'flex items-center',
      position: {
        none: '',
        start: 'rounded-r-none',
        middle: '!rounded-none',
        end: 'rounded-l-none',
      },
    },
    label:
      'ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-blue-200 text-xs font-semibold text-blue-800',
    outline: {
      color: {
        gray: 'border border-gray-900 dark:border-white',
      },
      off: '',
      on: 'bg-white text-gray-900 transition-all duration-75 ease-in group-hover:bg-opacity-0 group-hover:text-inherit dark:bg-gray-900 dark:text-white',
      pill: {
        off: 'rounded-md',
        on: 'rounded-full',
      },
    },
    pill: {
      off: 'rounded-lg',
      on: 'rounded-full',
    },
    size: {
      xs: 'text-xs px-2 py-1',
      sm: 'text-sm px-3 py-1.5',
      md: 'text-sm px-4 py-2',
      lg: 'text-base px-5 py-2.5',
      xl: 'text-base px-6 py-3',
    },
  },
  textInput: {
    base: 'flex',
    addon:
      'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400',
    field: {
      base: 'relative w-full',
      icon: {
        base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
        svg: 'h-5 w-5 text-gray-500 dark:text-gray-400',
      },
      input: {
        base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
        sizes: {
          sm: 'p-2 sm:text-xs',
          md: 'p-2.5 text-sm',
          lg: 'sm:text-md p-4',
        },
        colors: {
          gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          info: 'border-blue-500 bg-blue-50 text-blue-900 placeholder-blue-700 focus:border-blue-500 focus:ring-blue-500 dark:border-blue-400 dark:bg-blue-100 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          failure:
            'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
          warning:
            'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
          success:
            'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
        },
        withIcon: {
          on: 'pl-10',
          off: '',
        },
        withAddon: {
          on: 'rounded-r-lg',
          off: 'rounded-lg',
        },
        withShadow: {
          on: 'shadow-sm dark:shadow-sm-light',
          off: '',
        },
      },
    },
  },
  helperText: {
    base: 'mt-2 text-sm',
    colors: {
      gray: 'text-gray-500 dark:text-gray-400',
      info: 'text-blue-700 dark:text-blue-800',
      success: 'text-green-600 dark:text-green-500',
      failure: 'text-red-600 dark:text-red-500',
      warning: 'text-yellow-500 dark:text-yellow-600',
    },
  },
  checkbox: {
    base: 'h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600',
  },
  radio: {
    base: 'h-4 w-4 border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:bg-blue-600 dark:focus:ring-blue-600',
  },
  label: {
    base: 'text-sm font-medium',
    colors: {
      default: 'text-gray-900 dark:text-gray-300',
      info: 'text-blue-500 dark:text-blue-600',
      failure: 'text-red-700 dark:text-red-500',
      warning: 'text-yellow-500 dark:text-yellow-600',
      success: 'text-green-700 dark:text-green-500',
    },
    disabled: 'opacity-50',
  },
  toggleSwitch: {
    base: 'group relative flex items-center rounded-lg focus:outline-none',
    active: {
      on: 'cursor-pointer',
      off: 'cursor-not-allowed opacity-50',
    },
    toggle: {
      base: 'toggle-bg h-6 w-11 rounded-full border group-focus:ring-4 group-focus:ring-blue-500/25',
      checked: {
        on: 'border-blue-700 bg-blue-700 after:translate-x-full after:border-white',
        off: 'border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700',
      },
    },
    label: 'ml-3 text-sm font-medium text-gray-900 dark:text-gray-300',
  },
  card: {
    base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800',
    children: 'flex h-full flex-col justify-center gap-4 p-6',
    horizontal: {
      off: 'flex-col',
      on: 'flex-col md:max-w-xl md:flex-row',
    },
    href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
    img: {
      base: '',
      horizontal: {
        off: 'rounded-t-lg',
        on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg',
      },
    },
  },
};

export default theme;
