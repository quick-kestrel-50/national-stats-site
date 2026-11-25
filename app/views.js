// HTML for each page, built from the data. Every value is escaped
// before it goes into the page. Pages:
//   #/                     the one table: 24 countries x 6 indicators
//   #/country/<slug>       one country, all six indicators + ranks
//   #/indicator/<id>       one indicator, ranked chart + table
//   #/sources              where every figure comes from

import { COUNTRIES, INDICATORS, SOURCE_NOTE, countryBySlug, indicatorById, rankOf } from './data.js';
import { fmt, fmtShort, escape } from './format.js';
import { barChart, compareStrip } from './charts.js';

const REGIONS = ['All regions', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania'];

function nav(active) {
  const link = (href, text, key) =>
    `<a href="${href}"${active === key ? ' aria-current="page"' : ''}>${text}</a>`;
  return `<nav>${link('#/', 'The Table', 'table')} ${link('#/indicator/gdpPerCapita', 'Richest', 'rich')} ${link('#/indicator/lifeExpectancy', 'Longest lives', 'life')} ${link('#/indicator/population', 'Biggest', 'pop')} ${link('#/sources', 'Sources', 'sources')}</nav>`;
}

function indicatorTabs(current) {
  return `<div class="tabs">${INDICATORS.map((i) => `<a href="#/indicator/${i.id}"${i.id === current ? ' aria-current="page"' : ''}>${escape(i.label)}</a>`).join('')}</div>`;
}

function tableRows(rows, sortId) {
  return rows
    .map((c, i) => {
      const cells = INDICATORS.map((ind) => {
        const hot = ind.id === sortId ? ' class="sorted"' : '';
        return `<td${hot}>${escape(fmt(c[ind.id], ind.id))}</td>`;
      }).join('');
      return `<tr><td class="rank">${i + 1}</td><td class="country"><a href="#/country/${escape(c.slug)}">${escape(c.name)}</a><span class="sub">${escape(c.capital)} · ${escape(c.region)}</span></td>${cells}</tr>`;
    })
    .join('');
}

function compareTable(sortId, region, query) {
  let rows = [...COUNTRIES];
  if (region && region !== 'All regions') rows = rows.filter((c) => c.region === region);
  if (query) {
    const q = query.toLowerCase();
    rows = rows.filter((c) => c.name.toLowerCase().includes(q) || c.capital.toLowerCase().includes(q));
  }
  rows.sort((a, b) => b[sortId] - a[sortId]);
  const heads = INDICATORS.map(
    (ind) => `<th><a href="#/?sort=${ind.id}${region && region !== 'All regions' ? `&region=${encodeURIComponent(region)}` : ''}">${escape(ind.short)}${ind.id === sortId ? ' ▼' : ''}</a><span class="unit">${escape(ind.unit)}</span></th>`,
  ).join('');
  return `<table>
<thead><tr><th>#</th><th>Country</th>${heads}</tr></thead>
<tbody>${rows.length ? tableRows(rows, sortId) : `<tr><td colspan="8">No country matches that search.</td></tr>`}</tbody>
</table>
<p class="note">${escape(SOURCE_NOTE)}</p>`;
}

export function home(state) {
  const sortId = indicatorById(state.sort).id;
  const region = state.region || 'All regions';
  const top = [...COUNTRIES].sort((a, b) => b.gdpPerCapita - a.gdpPerCapita).slice(0, 8);
  const chart = barChart(
    top.map((c) => ({ name: c.name, value: c.gdpPerCapita, href: `#/country/${c.slug}`, highlight: c.slug === 'switzerland' })),
    'gdpPerCapita',
    'GDP per capita, US$, 2023',
  );
  const options = REGIONS.map((r) => `<option${r === region ? ' selected' : ''}>${escape(r)}</option>`).join('');
  return `${nav('table')}
<header class="hero">
<h1>THE WORLD IN NUMBERS</h1>
<p class="lede">Every nation, every number, one table. <strong>24 countries · 6 indicators · all 2023 World Bank figures</strong> — sort it, filter it, click any country to open its full page.</p>
</header>
<section class="panel">
<h2>The one table — sorted by ${escape(indicatorById(sortId).label)}</h2>
<form class="controls" onsubmit="return false">
<label>Search <input id="q" type="search" placeholder="Country or capital…" value="${escape(state.query || '')}"></label>
<label>Region <select id="region">${options}</select></label>
<button id="apply" type="button">Apply</button>
</form>
${compareTable(sortId, region, state.query || '')}
</section>
<section class="panel"><h2>Richest per person — GDP per capita, 2023</h2>${chart}<p class="note">Switzerland leads at $100,000 a head; Nigeria sits at $1,600. <a href="#/indicator/gdp-per-capita">See the full ranking →</a></p></section>
<section class="panel facts">
<h2>Three numbers that tell the story</h2>
<ul>
<li><strong>1.43 bn</strong> — India, the most populous country on Earth in 2023, just ahead of China at 1.41 bn.</li>
<li><strong>84.0 years</strong> — life expectancy in Japan, the longest of the 24; Nigeria, at 53.8, is the shortest by 30 years.</li>
<li><strong>0.72</strong> — South Korea's fertility rate, the lowest in the table; Nigeria's 5.14 is the highest.</li>
</ul>
</section>`;
}

export function country(slug) {
  const c = countryBySlug(slug);
  if (!c) return `${nav('')}<h1>Not found</h1><p>There is no country at this address. <a href="#/">Back to the table</a>.</p>`;
  const cards = INDICATORS.map((ind) => {
    const rank = rankOf(c, ind.id);
    return `<div class="stat"><span class="stat-rank">#${rank} of 24</span><span class="stat-value">${escape(fmt(c[ind.id], ind.id))}</span><span class="stat-label">${escape(ind.label)} (${escape(ind.unit)})</span></div>`;
  }).join('');
  const biggest = [...COUNTRIES].sort((a, b) => b.population - a.population)[0];
  const richest = [...COUNTRIES].sort((a, b) => b.gdpPerCapita - a.gdpPerCapita)[0];
  const compare = c.slug === 'japan'
    ? compareStrip(c, biggest, 'population', 'Population vs the biggest — India')
    : compareStrip(c, richest, 'gdpPerCapita', 'GDP per capita vs the richest — Switzerland');
  return `${nav('')}
<p><a href="#/">← The table</a></p>
<header class="hero"><h1>${escape(c.name).toUpperCase()}</h1>
<p class="lede">Capital ${escape(c.capital)} · ${escape(c.region)} · all figures World Bank, 2023.</p></header>
<section class="stats">${cards}</section>
<section class="panel">${compare}
<p class="note">${escape(SOURCE_NOTE)} Ranks are among the 24 countries in this atlas.</p></section>
<section class="panel"><h2>Where ${escape(c.name)} stands</h2>
<ul>
<li>Population rank <strong>#${rankOf(c, 'population')}</strong> of 24 (${escape(fmt(c.population, 'population'))} million people).</li>
<li>GDP per capita rank <strong>#${rankOf(c, 'gdpPerCapita')}</strong> of 24 (${escape(fmt(c.gdpPerCapita, 'gdpPerCapita'))}).</li>
<li>Life expectancy rank <strong>#${rankOf(c, 'lifeExpectancy')}</strong> of 24 (${escape(fmt(c.lifeExpectancy, 'lifeExpectancy'))}).</li>
<li>Urban share ${escape(fmt(c.urban, 'urban'))} of the population lives in cities.</li>
</ul></section>`;
}

export function indicator(id) {
  const ind = indicatorById(id);
  const rows = [...COUNTRIES].sort((a, b) => b[ind.id] - a[ind.id]);
  const chart = barChart(
    rows.slice(0, 10).map((c) => ({ name: c.name, value: c[ind.id], href: `#/country/${c.slug}`, highlight: false })),
    ind.id,
    `${ind.label}, ${ind.unit}, 2023`,
  );
  const low = rows[rows.length - 1];
  const high = rows[0];
  return `${nav('')}
<header class="hero"><h1>${escape(ind.label).toUpperCase()}</h1>
<p class="lede">${escape(ind.label)} (${escape(ind.unit)}), 2023 — highest ${escape(high.name)} at ${escape(fmt(high[ind.id], ind.id))}, lowest ${escape(low.name)} at ${escape(fmt(low[ind.id], ind.id))}.</p></header>
${indicatorTabs(ind.id)}
<section class="panel"><h2>Top 10 of 24</h2>${chart}</section>
<section class="panel"><h2>Full ranking</h2>${compareTable(ind.id, 'All regions', '')}</section>`;
}

export function sources() {
  return `${nav('sources')}
<header class="hero"><h1>SOURCES &amp; METHOD</h1>
<p class="lede">No invented numbers. Every figure on this site is a published statistic, with its source and year.</p></header>
<section class="panel"><h2>Where the numbers come from</h2>
<table class="src"><thead><tr><th>Indicator</th><th>Source</th><th>Year</th></tr></thead><tbody>
${INDICATORS.map((i) => `<tr><td>${escape(i.label)}</td><td>World Bank, World Development Indicators</td><td>2023</td></tr>`).join('')}
</tbody></table>
<p class="note">Population: SP.POP.TOTL. GDP per capita: NY.GDP.PCAP.CD (current US$). GDP total: NY.GDP.MKTP.CD. Life expectancy: SP.DYN.LE00.IN. Fertility: SP.DYN.TFRT.IN. Urban population: SP.URB.TOTL.IN.ZS.</p></section>
<section class="panel"><h2>Method</h2>
<ul>
<li>24 countries chosen to span every inhabited continent and every income band, from Switzerland ($100,000 per head) to Nigeria ($1,600).</li>
<li>Figures are rounded for display — GDP per capita to the nearest $100, population to 0.1 million — so a value may differ by a rounding step from the unrounded release.</li>
<li>Ranks are among these 24 countries only, not the whole world.</li>
<li>This site is an original atlas built for make.fun's national statistics bounty. It copies no other site's brand, text or images.</li>
</ul></section>`;
}

export function missing() {
  return `${nav('')}<h1>Not found</h1><p>There is no page at this address. <a href="#/">Back to the table</a>.</p>`;
}
