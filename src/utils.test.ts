import {
  ALL_COUNTRY_URL,
  COUNTRY_CURRENCY_URL,
  COUNTRY_LANGUAGE_URL,
  COUNTRY_NAME_URL,
  COUNTRY_REGION_URL,
  getAPIUrl,
  getProcessedCountryData,
} from './utils';
import { apiData } from './mock';

test('test getProcessedCountryData function', async () => {
  const data = await getProcessedCountryData(apiData, true);
  expect(data).toEqual([
    {
      borderCountries: ['ROU', 'UKR'],
      capital: ['Chișinău'],
      code: 'MDA',
      currencies: ['Moldovan leu'],
      flag: {
        alt: 'The flag of Moldova is composed of three equal vertical bands of blue, yellow and red, with the national coat of arms centered in the yellow band.',
        png: 'https://flagcdn.com/w320/md.png',
        svg: 'https://flagcdn.com/md.svg',
      },
      languages: ['Romanian'],
      name: 'Republic of Moldova',
      nativeName: 'Moldova',
      population: 2617820,
      region: 'Europe',
    },
  ]);
});

test('test getAPIUrl function', () => {
  const url1 = getAPIUrl('name');
  expect(url1).toBe(COUNTRY_NAME_URL);
  const url2 = getAPIUrl('region');
  expect(url2).toBe(COUNTRY_REGION_URL);
  const url3 = getAPIUrl('lang');
  expect(url3).toBe(COUNTRY_LANGUAGE_URL);
  const url4 = getAPIUrl('currency');
  expect(url4).toBe(COUNTRY_CURRENCY_URL);
  const url5 = getAPIUrl('test');
  expect(url5).toBe(ALL_COUNTRY_URL);
});
