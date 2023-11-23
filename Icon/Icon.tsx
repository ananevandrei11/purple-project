import clsx from 'clsx';
import classes from './Icon.module.css';
import { IconProps } from './Icon.props';

const Icon = ({
  titleAccess,
  htmlColor,
  children,
  className,
  ...props
}: IconProps) => (
  <svg
    {...props}
    className={clsx(className, classes.icon)}
    focusable={false}
    aria-hidden={titleAccess ? undefined : 'true'}
    role={titleAccess ? 'img' : undefined}
    color={htmlColor}
    xmlns="http://www.w3.org/2000/svg">
    {titleAccess ? <title>{titleAccess}</title> : null}
    {children}
  </svg>
);

export default Icon;
