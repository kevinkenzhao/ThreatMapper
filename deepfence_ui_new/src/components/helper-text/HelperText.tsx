import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type { ComponentColors } from '../../theme/Theme';
import { useTheme } from '../../theme/ThemeContext';

export interface HelperColors
  extends Pick<ComponentColors, 'gray' | 'info' | 'failure' | 'warning' | 'success'> {
  [key: string]: string;
}

export interface HelperTextProps
  extends PropsWithChildren<Omit<ComponentProps<'p'>, 'color' | 'className'>> {
  color?: keyof HelperColors;
  value?: string;
}

const HelperText: FC<HelperTextProps> = ({
  value,
  children,
  color = 'default',
  ...props
}) => {
  const { helperText } = useTheme().theme;
  return (
    <p className={classNames(helperText.base, helperText.colors[color])} {...props}>
      {value ?? children ?? ''}
    </p>
  );
};

export default HelperText;
