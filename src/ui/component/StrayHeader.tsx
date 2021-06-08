import React from 'react';
import cx from 'clsx';

export interface StrayHeaderProps {
  title?: string;
  secondTitle?: string;
  subTitle?: string;
  center?: boolean;
  className?: string;
}

const Header = ({
  title,
  subTitle,
  secondTitle,
  center = false,
}: StrayHeaderProps) => {
  return (
    <div className={cx('mb-[60px]', center && 'text-center')}>
      {title && <div className="text-24 font-bold">{title}</div>}
      {secondTitle && <div className="text-20 font-medium">{secondTitle}</div>}
      {subTitle && (
        <div className="text-14 text-gray-content mt-8">{subTitle}</div>
      )}
    </div>
  );
};

export default Header;
