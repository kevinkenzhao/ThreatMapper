import { HelperColors } from '../components/helper-text/HelperText';
import { TextInputColors, TextInputSizes } from '../components/input/TextInput';
import { LabelColors } from '../components/label/Label';

export interface ComponentSizes {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
  '7xl': string;
}

export interface ButtonSizes extends Pick<ComponentSizes, 'xs' | 'sm' | 'lg' | 'xl'> {
  [key: string]: string;
}

export interface ComponentStateColors {
  info: string;
  failure: string;
  success: string;
  warning: string;
}

export interface ComponentColors extends ComponentStateColors {
  [key: string]: string;
  blue: string;
  cyan: string;
  dark: string;
  gray: string;
  green: string;
  indigo: string;
  light: string;
  lime: string;
  pink: string;
  purple: string;
  red: string;
  teal: string;
  yellow: string;
}

export interface ButtonColors
  extends Pick<
    ComponentColors,
    'dark' | 'failure' | 'gray' | 'info' | 'light' | 'purple' | 'success' | 'warning'
  > {
  [key: string]: string;
}

export interface ButtonOutlineColors extends Pick<ComponentColors, 'gray'> {
  // eslint-disable-next-line
  [key: string]: string;
}

export interface ThemeBoolean {
  off: string;
  on: string;
}

export interface Theme extends Record<string, unknown> {
  button: {
    base: string;
    color: ButtonColors;
    disabled: string;
    label: string;
    pill: ThemeBoolean;
    size: ButtonSizes;
    outline: ThemeBoolean & {
      color: ButtonOutlineColors;
      pill: ThemeBoolean;
    };
  };
  textInput: {
    base: string;
    addon: string;
    field: {
      base: string;
      icon: {
        base: string;
        svg: string;
      };
      input: {
        base: string;
        sizes: TextInputSizes;
        colors: TextInputColors;
        withIcon: ThemeBoolean;
        withAddon: ThemeBoolean;
        withShadow: ThemeBoolean;
      };
    };
  };
  helperText: {
    base: string;
    colors: HelperColors;
  };
  checkbox: {
    base: string;
  };
  radio: {
    base: string;
  };
  label: {
    base: string;
    colors: LabelColors;
    disabled: string;
  };
  toggleSwitch: {
    base: string;
    active: ThemeBoolean;
    toggle: {
      base: string;
      checked: ThemeBoolean;
    };
    label: string;
  };
  card: {
    base: string;
    children: string;
    horizontal: {
      off: string;
      on: string;
    };
    href: string;
    img: {
      base: string;
      horizontal: {
        off: string;
        on: string;
      };
    };
  };
}
