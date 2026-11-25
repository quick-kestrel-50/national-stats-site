// Number formatting for the tables and charts. One job: make a raw
// figure readable at a glance, with the unit kept beside it.

export function fmt(value, indicatorId) {
  if (indicatorId === 'population') return value.toFixed(1);
  if (indicatorId === 'gdpPerCapita') return '$' + Math.round(value).toLocaleString('en-US');
  if (indicatorId === 'gdpTotal') return '$' + value.toLocaleString('en-US') + ' bn';
  if (indicatorId === 'lifeExpectancy') return value.toFixed(1) + ' yrs';
  if (indicatorId === 'fertility') return value.toFixed(2);
  if (indicatorId === 'urban') return Math.round(value) + '%';
  return String(value);
}

export function fmtShort(value, indicatorId) {
  if (indicatorId === 'population') return value.toFixed(0) + 'm';
  if (indicatorId === 'gdpPerCapita') return '$' + Math.round(value / 1000) + 'k';
  if (indicatorId === 'gdpTotal') return '$' + value.toLocaleString('en-US') + 'bn';
  return fmt(value, indicatorId);
}

// A 0..1 position of a value between the field's min and max, for bars.
export function scale(value, min, max) {
  if (max <= min) return 0;
  return (value - min) / (max - min);
}

export const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
