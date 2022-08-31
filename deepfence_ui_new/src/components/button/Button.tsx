import classname from 'classnames';
import { ComponentProps, FC, ReactNode } from 'react';

import { ButtonColors, ButtonSizes } from '../../theme/Theme';
import { useTheme } from '../../theme/ThemeContext';

export interface PositionInButtonGroup {
  none: string;
  start: string;
  middle: string;
  end: string;
}

export interface ButtonProps
  extends Omit<ComponentProps<'button'>, 'className' | 'color'> {
  color?: keyof ButtonColors;
  label?: ReactNode;
  outline?: boolean;
  pill?: boolean;
  positionInGroup?: keyof PositionInButtonGroup;
  size?: keyof ButtonSizes;
}

const Button: FC<ButtonProps> = ({
  size = 'md',
  children,
  label,
  color = 'info',
  pill = false,
  outline = false,
  disabled,
  ...props
}) => {
  const { button } = useTheme().theme;

  return (
    <button
      className={classname(
        disabled && button.disabled,
        button.base,
        button.color[color],
        button.pill[pill ? 'on' : 'off'],
        outline && button.outline.color[color],
      )}
      disabled={disabled}
      {...props}
    >
      <span className={classname(button.size[size])}>
        <>
          {typeof children !== 'undefined' && children}
          {typeof label !== 'undefined' && (
            <span className={button.label} data-testid="button-label-testid">
              {label}
            </span>
          )}
        </>
      </span>
    </button>
  );
};

export default Button;
