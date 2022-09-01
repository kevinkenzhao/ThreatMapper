import classNames from 'classnames';
import type { ComponentProps, FC, ReactNode } from 'react';
import { forwardRef } from 'react';
import { ComponentColors, ComponentSizes } from '../../theme/Theme';
import { useTheme } from '../../theme/ThemeContext';
import HelperText from '../helper-text/HelperText';

export interface TextInputColors
  extends Pick<ComponentColors, 'gray' | 'info' | 'failure' | 'warning' | 'success'> {
  [key: string]: string;
}

export interface TextInputSizes extends Pick<ComponentSizes, 'sm' | 'md' | 'lg'> {
  [key: string]: string;
}

export interface TextInputProps
  extends Omit<ComponentProps<'input'>, 'ref' | 'color' | 'className'> {
  sizing?: keyof TextInputSizes;
  shadow?: boolean;
  helperText?: ReactNode;
  addon?: ReactNode;
  icon?: FC<ComponentProps<'svg'>>;
  color?: keyof TextInputColors;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { sizing = 'md', shadow, helperText, addon, icon: Icon, color = 'gray', ...props },
    ref,
  ) => {
    const { textInput } = useTheme().theme;
    return (
      <>
        <div className={textInput.base}>
          {addon && <span className={textInput.addon}>{addon}</span>}
          <div className={textInput.field.base}>
            {Icon && (
              <div className={textInput.field.icon.base}>
                <Icon className={textInput.field.icon.svg} />
              </div>
            )}
            <input
              className={classNames(
                textInput.field.input.base,
                textInput.field.input.colors[color],
                textInput.field.input.withIcon[Icon ? 'on' : 'off'],
                textInput.field.input.withAddon[addon ? 'on' : 'off'],
                textInput.field.input.withShadow[shadow ? 'on' : 'off'],
                textInput.field.input.sizes[sizing],
              )}
              {...props}
              ref={ref}
            />
          </div>
        </div>
        {helperText && <HelperText color={color}>{helperText}</HelperText>}
      </>
    );
  },
);

TextInput.displayName = 'TextInput';
