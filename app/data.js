// The figures. Every number is a published World Bank figure for 2023
// (World Development Indicators), rounded for display. Population in
// millions, GDP per capita in current US dollars, GDP total in US$ billions,
// life expectancy in years, fertility in births per woman, urban share in
// percent of population. Sources and the rounding note are shown on the
// site's Sources page (#/sources) and under every table.

export const SOURCE_NOTE =
  'World Bank, World Development Indicators, 2023. Figures rounded; see Sources.';

export const INDICATORS = [
  { id: 'population', label: 'Population', unit: 'million', short: 'Pop.' },
  { id: 'gdpPerCapita', label: 'GDP per capita', unit: 'US$', short: 'GDP / head' },
  { id: 'gdpTotal', label: 'GDP total', unit: 'US$ bn', short: 'GDP' },
  { id: 'lifeExpectancy', label: 'Life expectancy', unit: 'years', short: 'Life exp.' },
  { id: 'fertility', label: 'Fertility rate', unit: 'births / woman', short: 'Fertility' },
  { id: 'urban', label: 'Urban population', unit: '%', short: 'Urban' },
];

export const COUNTRIES = [
  { slug: 'usa', name: 'United States', capital: 'Washington, D.C.', region: 'North America', population: 335.0, gdpPerCapita: 80410, gdpTotal: 27720, lifeExpectancy: 78.4, fertility: 1.66, urban: 83 },
  { slug: 'china', name: 'China', capital: 'Beijing', region: 'Asia', population: 1411.8, gdpPerCapita: 12600, gdpTotal: 17790, lifeExpectancy: 78.0, fertility: 1.00, urban: 64 },
  { slug: 'india', name: 'India', capital: 'New Delhi', region: 'Asia', population: 1428.6, gdpPerCapita: 2500, gdpTotal: 3570, lifeExpectancy: 67.7, fertility: 2.00, urban: 36 },
  { slug: 'japan', name: 'Japan', capital: 'Tokyo', region: 'Asia', population: 124.5, gdpPerCapita: 33800, gdpTotal: 4210, lifeExpectancy: 84.0, fertility: 1.20, urban: 92 },
  { slug: 'germany', name: 'Germany', capital: 'Berlin', region: 'Europe', population: 84.7, gdpPerCapita: 52800, gdpTotal: 4460, lifeExpectancy: 80.9, fertility: 1.35, urban: 78 },
  { slug: 'uk', name: 'United Kingdom', capital: 'London', region: 'Europe', population: 68.7, gdpPerCapita: 48900, gdpTotal: 3380, lifeExpectancy: 81.0, fertility: 1.53, urban: 84 },
  { slug: 'france', name: 'France', capital: 'Paris', region: 'Europe', population: 68.4, gdpPerCapita: 46000, gdpTotal: 3030, lifeExpectancy: 83.0, fertility: 1.68, urban: 81 },
  { slug: 'brazil', name: 'Brazil', capital: 'Brasilia', region: 'South America', population: 216.4, gdpPerCapita: 10000, gdpTotal: 2170, lifeExpectancy: 76.0, fertility: 1.62, urban: 87 },
  { slug: 'canada', name: 'Canada', capital: 'Ottawa', region: 'North America', population: 39.6, gdpPerCapita: 55700, gdpTotal: 2140, lifeExpectancy: 81.8, fertility: 1.26, urban: 82 },
  { slug: 'australia', name: 'Australia', capital: 'Canberra', region: 'Oceania', population: 26.5, gdpPerCapita: 64500, gdpTotal: 1690, lifeExpectancy: 83.2, fertility: 1.58, urban: 86 },
  { slug: 'korea', name: 'South Korea', capital: 'Seoul', region: 'Asia', population: 51.7, gdpPerCapita: 33100, gdpTotal: 1710, lifeExpectancy: 83.0, fertility: 0.72, urban: 81 },
  { slug: 'italy', name: 'Italy', capital: 'Rome', region: 'Europe', population: 58.8, gdpPerCapita: 38400, gdpTotal: 2300, lifeExpectancy: 83.0, fertility: 1.20, urban: 71 },
  { slug: 'spain', name: 'Spain', capital: 'Madrid', region: 'Europe', population: 48.3, gdpPerCapita: 33100, gdpTotal: 1580, lifeExpectancy: 83.7, fertility: 1.12, urban: 81 },
  { slug: 'mexico', name: 'Mexico', capital: 'Mexico City', region: 'North America', population: 129.7, gdpPerCapita: 13900, gdpTotal: 1790, lifeExpectancy: 75.4, fertility: 1.81, urban: 81 },
  { slug: 'indonesia', name: 'Indonesia', capital: 'Jakarta', region: 'Asia', population: 277.5, gdpPerCapita: 4900, gdpTotal: 1370, lifeExpectancy: 71.1, fertility: 2.13, urban: 58 },
  { slug: 'turkey', name: 'Turkey', capital: 'Ankara', region: 'Europe / Asia', population: 85.3, gdpPerCapita: 15700, gdpTotal: 1110, lifeExpectancy: 77.0, fertility: 1.51, urban: 77 },
  { slug: 'nigeria', name: 'Nigeria', capital: 'Abuja', region: 'Africa', population: 223.8, gdpPerCapita: 1600, gdpTotal: 360, lifeExpectancy: 53.8, fertility: 5.14, urban: 54 },
  { slug: 'egypt', name: 'Egypt', capital: 'Cairo', region: 'Africa', population: 112.7, gdpPerCapita: 3900, gdpTotal: 400, lifeExpectancy: 70.7, fertility: 2.76, urban: 43 },
  { slug: 'kenya', name: 'Kenya', capital: 'Nairobi', region: 'Africa', population: 55.1, gdpPerCapita: 2200, gdpTotal: 110, lifeExpectancy: 66.6, fertility: 3.29, urban: 29 },
  { slug: 'argentina', name: 'Argentina', capital: 'Buenos Aires', region: 'South America', population: 45.8, gdpPerCapita: 13300, gdpTotal: 640, lifeExpectancy: 76.9, fertility: 1.48, urban: 92 },
  { slug: 'netherlands', name: 'Netherlands', capital: 'Amsterdam', region: 'Europe', population: 17.9, gdpPerCapita: 67000, gdpTotal: 1120, lifeExpectancy: 81.9, fertility: 1.47, urban: 93 },
  { slug: 'sweden', name: 'Sweden', capital: 'Stockholm', region: 'Europe', population: 10.5, gdpPerCapita: 55500, gdpTotal: 590, lifeExpectancy: 83.2, fertility: 1.46, urban: 88 },
  { slug: 'switzerland', name: 'Switzerland', capital: 'Bern', region: 'Europe', population: 8.9, gdpPerCapita: 100000, gdpTotal: 890, lifeExpectancy: 83.7, fertility: 1.39, urban: 74 },
  { slug: 'poland', name: 'Poland', capital: 'Warsaw', region: 'Europe', population: 36.8, gdpPerCapita: 22100, gdpTotal: 810, lifeExpectancy: 78.0, fertility: 1.16, urban: 60 },
];

export function countryBySlug(slug) {
  return COUNTRIES.find((c) => c.slug === slug);
}

export function indicatorById(id) {
  return INDICATORS.find((i) => i.id === id) || INDICATORS[0];
}

// Rank of a country on one indicator, 1 = highest value.
export function rankOf(country, indicatorId) {
  const sorted = [...COUNTRIES].sort((a, b) => b[indicatorId] - a[indicatorId]);
  return sorted.findIndex((c) => c.slug === country.slug) + 1;
}
