import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import { excludeClassName } from '../../helpers';
import { useTheme } from '../../theme/ThemeContext';

export interface CardProps
  extends PropsWithChildren<Omit<ComponentProps<'div'>, 'className'>> {
  horizontal?: boolean;
  href?: string;
  imgAlt?: string;
  imgSrc?: string;
}

export const Card: FC<CardProps> = ({
  children,
  horizontal,
  href,
  imgAlt,
  imgSrc,
  ...props
}): JSX.Element => {
  const { card } = useTheme().theme;

  const Component = typeof href === 'undefined' ? 'div' : 'a';
  const compProps = excludeClassName(props);

  return (
    <Component
      className={classNames(
        card.base,
        card.horizontal[horizontal ? 'on' : 'off'],
        href && card.href,
      )}
      data-testid="flowbite-card"
      href={href}
      {...compProps}
    >
      {imgSrc && (
        <img
          alt={imgAlt ?? ''}
          className={classNames(
            card.img.base,
            card.img.horizontal[horizontal ? 'on' : 'off'],
          )}
          src={imgSrc}
        />
      )}
      <div className={card.children}>{children}</div>
    </Component>
  );
};

export default Card;
