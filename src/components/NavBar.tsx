import { Form, InputGroup } from "react-bootstrap";
//import { FaSearch as FaSearchIcon } from "react-icons/fa";
import { useState, ChangeEvent, useEffect} from "react";
import "../styles/NavBar.css";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

const NavBar: React.FC = () => { 
  // Type the state as string
  const [searchItem, setSearchItem] = useState<string>("");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); //dark mode default
  // Type the event parameter for TypeScript
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };
  const toggleTheme=()=>{
    setIsDarkMode((prev)=>!prev);
  };
  useEffect(()=>{
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  } , [isDarkMode]);

  return (
    <div className="container m-5">
      <div className="row align-items-center">
        {/* Search bar */}
        <div className="col-lg-8 head">
          <InputGroup className="searchbar ">
            <InputGroup.Text className="search-icon">
            <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search City..."
              value={searchItem}
              onChange={handleSearchChange}
              className="search-input"
            />
          </InputGroup>
        </div>

        {/* Light/Dark mode toggle placeholder */}
        <div className="col-lg-4 head text-end">
          <button 
            className={`btn toggle-btn head
              ${
                isDarkMode ? "dark" : "light"
              }
              `}
            onClick={toggleTheme}>
            {/* <i className={`bi ${
              isDarkMode ? "bi-sun-fill" : "bi-moon-fill"
            }`}
            ></i> */}
            <i className="bi bi-moon-fill moon"></i>
    <div className="toggle-circle"></div>
    <i className="bi bi-sun-fill sun"></i>
          </button>

        </div>
      </div>
    </div>
  );
};

export default NavBar;
