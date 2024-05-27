import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  lazy,
  Suspense,
} from 'react';

import {
  ALL_COUNTRY_URL,
  defaultMenu,
  getAPIUrl,
  getProcessedCountryData,
} from '../../utils';
import { ICountry } from '../../country.interface';
import './CountryList.scss';
import { CountryWidget } from '../country-widget/CountryWidget';
import { ModalComponent } from '../Modal/Modal';
// import { CountryDetails } from '../country-details/CountryDetails';
import Loader from '../../loader.gif';
import {
  DB_NAME,
  addDataToStore,
  getAllStoreData,
  initializeIndexedDb,
} from '../../db';
import DropdownComponent from '../dropdown/Dropdown';
const CountryDetails = lazy(() => import('../country-details/CountryDetails'));

export const CountryList = () => {
  const [apiData, setApiData] = useState<ICountry[]>([]);
  const [countryListData, setCountryListData] = useState<ICountry[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState(defaultMenu);
  const [paginationDetails, setPaginationDetails] = useState({
    initialPageSize: 40,
    currentPage: 1,
    nextPageSize: 20,
  });
  const countryRef = useRef<any>(null);
  const abortControllerRef = useRef<any>(null);
  const fetchData = useCallback(
    async (url: string, serveFromCache = false) => {
      try {
        setIsLoading(true);
        let isOnline = navigator.onLine;
        let data: ICountry[] = [];
        let isServedFromAPI = false;
        if (serveFromCache || !isOnline) {
          data = await getAllStoreData(DB_NAME);
        }
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
        const newAbortController = new AbortController();
        abortControllerRef.current = newAbortController;
        if (isOnline && !data.length) {
          isServedFromAPI = true;
          const result = await fetch(url, {
            signal: newAbortController.signal,
          });
          data = await result.json();
        }
        if (!data) return;
        const countryList: ICountry[] = await getProcessedCountryData(
          data,
          isServedFromAPI,
        );
        setApiData(countryList);
        setCountryListData(
          countryList.slice(0, paginationDetails.initialPageSize),
        );
        setIsLoading(false);
        if (isOnline) {
          initializeIndexedDb().then(() => {
            addDataToStore(DB_NAME, countryList);
          });
        }
      } catch (err: any) {
        if (err?.message?.trim() !== 'The operation was aborted.') {
          setIsLoading(false);
          setCountryListData([]);
        }
      }
    },
    [paginationDetails.initialPageSize],
  );

  useEffect(() => {
    fetchData(ALL_COUNTRY_URL);
  }, [fetchData]);

  useEffect(() => {
    document.addEventListener('scroll', () =>
      debounceInnerFn(fetchMoreCountries),
    );
    return () => {
      document.removeEventListener('scroll', () =>
        debounceInnerFn(fetchMoreCountries),
      );
    };
  });

  const fetchMoreCountries = () => {
    const reachedEnd =
      window.scrollY + window.innerHeight >= countryRef.current.offsetHeight;
    if (reachedEnd) {
      const { currentPage, initialPageSize, nextPageSize } = paginationDetails;
      const from = initialPageSize + (currentPage - 1) * nextPageSize;
      const to = from + nextPageSize;
      const slicedData = apiData.slice(from, to);
      setCountryListData([...countryListData, ...slicedData]);
      setPaginationDetails({
        ...paginationDetails,
        currentPage: currentPage + 1,
      });
    }
  };

  const debounce = useCallback(() => {
    let timer: any;
    return function (fn: (...args: any[]) => void, ...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(...args);
      }, 500);
    };
  }, []);

  const debounceInnerFn = React.useMemo(() => {
    return debounce();
  }, [debounce]);

  const intiateSearch = useCallback(
    async (searchValue: string) => {
      if (!searchValue) {
        await fetchData(ALL_COUNTRY_URL, true);
      } else {
        const [selectedMenu] = menu.filter((item) => item.isSelected);
        const url = getAPIUrl(selectedMenu.id);
        await fetchData(`${url}${searchValue}`);
      }
    },
    [fetchData, menu],
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target as HTMLInputElement;
      setSearchValue(value);
      debounceInnerFn(intiateSearch, value);
    },
    [debounceInnerFn, intiateSearch],
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedCountryData, setSelectedCountryData] =
    useState<ICountry | null>(null);

  const handleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  const openModal = useCallback(
    (selectedCountryData: ICountry) => {
      setSelectedCountryData(selectedCountryData);
      handleModal();
    },
    [handleModal],
  );

  const setFiltercriteria = (selectedFilter: string) => {
    const updatedMenu = menu.map((item) => {
      if (item.id === selectedFilter) {
        return {
          ...item,
          isSelected: true,
        };
      }
      return {
        ...item,
        isSelected: false,
      };
    });
    setMenu(updatedMenu);
  };
  return (
    <div className="country-list-container">
      <ModalComponent handleModal={handleModal} showModal={showModal}>
        <Suspense fallback={<img src={Loader} alt="Loading" />}>
          {selectedCountryData && (
            <CountryDetails countryData={selectedCountryData} />
          )}
        </Suspense>
      </ModalComponent>
      <section className="country-section">
        <header>
          <div className="search">
            <DropdownComponent
              menu={menu}
              setFiltercriteria={setFiltercriteria}
            />
            <input
              className="text-input"
              type="text"
              placeholder="Search"
              onChange={handleSearch}
              value={searchValue}
              data-testid="search-input"
            />
          </div>
        </header>
        {isLoading && <img src={Loader} alt="Loading" />}
        {!isLoading && (
          <div className="country-list" ref={countryRef}>
            {countryListData.map((countryData) => (
              <div className="country-widget" key={countryData.code}>
                <CountryWidget data={countryData} getDetails={openModal} />
              </div>
            ))}
            {!countryListData.length && <h2>No data found</h2>}
          </div>
        )}
      </section>
    </div>
  );
};
