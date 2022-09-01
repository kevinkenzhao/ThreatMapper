import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import { useTheme } from '../../theme/ThemeContext';

export type RadioProps = Omit<ComponentProps<'input'>, 'type' | 'className' | 'ref'>;

export const Radio = forwardRef<HTMLInputElement, RadioProps>((props, ref) => {
  const { radio } = useTheme().theme;
  return <input ref={ref} className={radio.base} type="radio" {...props} />;
});

Radio.displayName = 'Radio';
