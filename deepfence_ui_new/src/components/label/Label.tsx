import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { ComponentStateColors } from '../../theme/Theme';
import { useTheme } from '../../theme/ThemeContext';

export interface LabelColors extends ComponentStateColors {
  [key: string]: string;
  default: string;
}

export interface LabelProps
  extends PropsWithChildren<Omit<ComponentProps<'label'>, 'className' | 'color'>> {
  color?: keyof LabelColors;
  value?: string;
  disabled?: boolean;
}

export const Label: FC<LabelProps> = ({
  children,
  color = 'default',
  disabled = false,
  value,
  ...props
}): JSX.Element => {
  const { label } = useTheme().theme;
  return (
    <label
      className={classNames(label.base, label.colors[color], disabled ?? label.disabled)}
      {...props}
    >
      {value ?? children ?? ''}
    </label>
  );
};
