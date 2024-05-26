import Dropdown from 'react-bootstrap/Dropdown';
import './Dropdown.scss';

type DropdownProps = {
  menu: {
    id: string;
    name: string;
    isSelected: boolean;
  }[];
  setFiltercriteria: (eventKey: string) => void;
};

function DropdownComponent(props: DropdownProps) {
  const [selected] = props.menu.filter((item) => item.isSelected);
  const handleDropdown = (eventKey: any) => {
    props.setFiltercriteria(eventKey);
  };
  return (
    <Dropdown onSelect={handleDropdown}>
      <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
        {selected.name}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {props.menu.map((item) => (
          <Dropdown.Item eventKey={item.id}>{item.name}</Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownComponent;
