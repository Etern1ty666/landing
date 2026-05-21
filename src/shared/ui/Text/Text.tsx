import { createElement, type ElementType, type ReactNode } from 'react';
import styles from './Text.module.css';

export type TextVariant = 'heading' | 'body' | 'muted';

type TextProps = {
  variant?: TextVariant;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

const DEFAULT_TAG: Record<TextVariant, ElementType> = {
  heading: 'h1',
  body: 'p',
  muted: 'span',
};

export const Text = ({
  variant = 'body',
  as,
  className,
  children,
}: TextProps) => {
  const Tag = as ?? DEFAULT_TAG[variant];
  const classes = [styles[variant], className].filter(Boolean).join(' ');

  return createElement(Tag, { className: classes }, children);
};
