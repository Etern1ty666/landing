const RTF = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });

export const formatRelativeDate = (iso: string): string => {
  const date = new Date(iso);
  const diffMs = date.getTime() - Date.now();
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (Math.abs(diffDays) < 30) return RTF.format(diffDays, 'day');
  const diffMonths = Math.round(diffDays / 30);
  if (Math.abs(diffMonths) < 12) return RTF.format(diffMonths, 'month');
  return RTF.format(Math.round(diffMonths / 12), 'year');
};
