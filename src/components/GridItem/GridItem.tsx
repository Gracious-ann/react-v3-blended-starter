import type { ReactNode } from 'react';
import style from './GridItem.module.css';

interface GridItemProps {
  children: ReactNode;
  key: number;
  onClick: () => void;
}

export default function GridItem({ children, key, onClick }: GridItemProps) {
  return (
    <li
      onClick={onClick}
      key={key}
      className={style.item}
    >
      {children}
    </li>
  );
}
