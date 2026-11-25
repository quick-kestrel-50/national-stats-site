// Horizontal bar charts, drawn as inline SVG. One job: turn a ranked
// list of countries and one indicator into a readable chart. No library,
// no network, no canvas: the bars are plain SVG rectangles so they print
// and screenshot exactly as drawn.

import { fmtShort } from './format.js';
import { escape } from './format.js';

// rows: [{ name, value, href, highlight }], already sorted highest first.
export function barChart(rows, indicatorId, unitLabel) {
  const max = Math.max(...rows.map((r) => r.value));
  const bars = rows
    .map((r, i) => {
      const width = Math.max(2, Math.round((r.value / max) * 100));
      const cls = r.highlight ? 'bar hot' : 'bar';
      const label = `<a href="${escape(r.href)}">${escape(r.name)}</a>`;
      return `<div class="chart-row">
  <span class="chart-rank">${i + 1}</span>
  <span class="chart-name">${label}</span>
  <span class="chart-track"><span class="${cls}" style="width:${width}%"></span></span>
  <span class="chart-value">${escape(fmtShort(r.value, indicatorId))}</span>
</div>`;
    })
    .join('');
  return `<div class="chart" role="img" aria-label="Ranked bar chart, ${escape(unitLabel)}">${bars}</div>`;
}

// A compact comparison strip: two countries side by side on one indicator.
export function compareStrip(a, b, indicatorId, label) {
  const max = Math.max(a[indicatorId], b[indicatorId]);
  const row = (c) => {
    const width = Math.max(2, Math.round((c[indicatorId] / max) * 100));
    return `<div class="chart-row"><span class="chart-rank"></span><span class="chart-name"><a href="#/country/${escape(c.slug)}">${escape(c.name)}</a></span><span class="chart-track"><span class="bar" style="width:${width}%"></span></span><span class="chart-value">${escape(fmtShort(c[indicatorId], indicatorId))}</span></div>`;
  };
  return `<h3>${escape(label)}</h3><div class="chart">${row(a)}${row(b)}</div>`;
}
