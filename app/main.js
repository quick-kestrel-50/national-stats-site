// Router: hash routes, no network. window.__shotReady is false while a
// page renders and true once it is on screen, so a screenshot script
// knows when to capture.
//
//   #/                          the one table (sort/region/query in ?)
//   #/country/<slug>            one country
//   #/indicator/<id>            one indicator, ranked
//   #/sources                   sources and method

import { home, country, indicator, sources, missing } from './views.js';

const app = document.getElementById('app');

// Accept kebab-case indicator ids in links as well as camelCase.
function normaliseIndicator(id) {
  const map = {
    'gdp-per-capita': 'gdpPerCapita',
    'gdp-total': 'gdpTotal',
    'life-expectancy': 'lifeExpectancy',
    'population': 'population',
    'fertility': 'fertility',
    'urban': 'urban',
  };
  return map[id] || id;
}

function parseQuery(hash) {
  const q = hash.indexOf('?');
  return new URLSearchParams(q === -1 ? '' : hash.slice(q + 1));
}

function render() {
  window.__shotReady = false;
  const hash = location.hash || '#/';
  const query = parseQuery(hash);
  const path = hash.split('?')[0];
  const countryMatch = path.match(/^#\/country\/([^/?]+)/);
  const indicatorMatch = path.match(/^#\/indicator\/([^/?]+)/);
  if (countryMatch) {
    document.title = 'Country | World Atlas of Nations';
    app.innerHTML = country(decodeURIComponent(countryMatch[1]));
  } else if (indicatorMatch) {
    document.title = 'Indicator | World Atlas of Nations';
    app.innerHTML = indicator(normaliseIndicator(decodeURIComponent(indicatorMatch[1])));
  } else if (path === '#/sources') {
    document.title = 'Sources | World Atlas of Nations';
    app.innerHTML = sources();
  } else if (path === '#/' || path === '#') {
    document.title = 'World Atlas of Nations — Every nation, every number, one table';
    app.innerHTML = home({
      sort: normaliseIndicator(query.get('sort') || 'gdpPerCapita'),
      region: query.get('region') || 'All regions',
      query: query.get('q') || '',
    });
    wireControls();
  } else {
    document.title = 'Not found | World Atlas of Nations';
    app.innerHTML = missing();
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

// The table's search / region controls rebuild the hash, so the table
// state is a link anyone can share.
function wireControls() {
  const apply = document.getElementById('apply');
  if (!apply) return;
  apply.addEventListener('click', () => {
    const q = document.getElementById('q').value.trim();
    const region = document.getElementById('region').value;
    const sort = new URLSearchParams(location.hash.split('?')[1] || '').get('sort') || 'gdpPerCapita';
    const params = new URLSearchParams();
    params.set('sort', sort);
    if (region !== 'All regions') params.set('region', region);
    if (q) params.set('q', q);
    location.hash = '#/?' + params.toString();
  });
}

window.addEventListener('hashchange', render);
render();
