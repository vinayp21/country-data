export const getProcessedCountryData = async (
  apiData: any,
  isOnline: boolean,
) => {
  const processedData = apiData.map((data: any) => {
    const { nativeName, countryName } = getCountryName(data.name);
    const countryCode = data.cca3 || data.cioc;
    return {
      name: isOnline ? countryName : data.name,
      flag: isOnline ? data.flags : data.flag,
      population: data.population,
      region: data.region,
      capital: data.capital,
      nativeName: nativeName,
      currencies: getCurrencies(data.currencies, isOnline),
      borderCountries: isOnline ? data.borders : data.borderCountries,
      languages: getLanguages(data.languages, isOnline),
      code: isOnline ? countryCode : data.code,
    };
  });

  return processedData;
};

const getCountryName = (countryNameObj: {
  common: string;
  official: string;
}): {
  nativeName: string;
  countryName: string;
} => {
  if (!countryNameObj) {
    return {
      nativeName: '',
      countryName: '',
    };
  }
  const nativeName = countryNameObj.common || '';
  const countryName = countryNameObj.official || '';
  return {
    nativeName,
    countryName,
  };
};

const getLanguages = (languageData: any, isOnline: boolean): string[] => {
  if (!languageData) return [];
  if (!isOnline) return languageData;
  const keys = Object.keys(languageData) || [];
  const languages = keys.map((key) => languageData[key]);
  return languages || [];
};

const getCurrencies = (currencyData: any, isOnline: boolean): string[] => {
  if (!currencyData) return [];
  if (!isOnline) return currencyData;
  const keys = Object.keys(currencyData) || [];
  const currencies = keys.map((key) => currencyData[key].name);
  return currencies || [];
};

export const defaultMenu = [
  {
    id: 'name',
    name: 'Country Name',
    isSelected: true,
  },
  {
    id: 'region',
    name: 'Region',
    isSelected: false,
  },
  {
    id: 'lang',
    name: 'Language',
    isSelected: false,
  },
  {
    id: 'currency',
    name: 'Currency',
    isSelected: false,
  },
];

export const ALL_COUNTRY_URL = 'https://restcountries.com/v3.1/all';
export const COUNTRY_NAME_URL = 'https://restcountries.com/v3.1/name/';
export const COUNTRY_REGION_URL = 'https://restcountries.com/v3.1/region/';
export const COUNTRY_LANGUAGE_URL = 'https://restcountries.com/v3.1/lang/';
export const COUNTRY_CURRENCY_URL = 'https://restcountries.com/v3.1/currency/';

export const getAPIUrl = (selectedMenu: string) => {
  let url;
  switch (selectedMenu) {
    case 'name':
      url = COUNTRY_NAME_URL;
      break;
    case 'region':
      url = COUNTRY_REGION_URL;
      break;
    case 'lang':
      url = COUNTRY_LANGUAGE_URL;
      break;
    case 'currency':
      url = COUNTRY_CURRENCY_URL;
      break;
    default:
      url = ALL_COUNTRY_URL;
      break;
  }
  return url;
};
