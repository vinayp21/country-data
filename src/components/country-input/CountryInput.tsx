import DropdownComponent from '../dropdown/Dropdown';

type Menu = {
  isSelected: boolean;
  name: string;
  id: string;
};
type CountryInputProps = {
  menu: Menu[];
  setFiltercriteria: (selectedFilter: string) => void;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
};

export const CountryInput = (props: CountryInputProps) => {
  const { menu, setFiltercriteria, handleSearch, searchValue } = props;
  const [selectedMenu] = menu.filter((item) => !!item.isSelected);
  return (
    <header>
      <div className="search">
        <DropdownComponent menu={menu} setFiltercriteria={setFiltercriteria} />
        <input
          className="text-input"
          type="text"
          placeholder={`Search ${selectedMenu.name}`}
          onChange={handleSearch}
          value={searchValue}
          data-testid="search-input"
          aria-label="search-input"
        />
      </div>
    </header>
  );
};
