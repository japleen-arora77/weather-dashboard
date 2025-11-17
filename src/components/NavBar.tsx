import { Form, InputGroup, ListGroup } from "react-bootstrap";
//import { FaSearch as FaSearchIcon } from "react-icons/fa";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import "../styles/NavBar.css";

interface NavBarProps {
  onSearch: (city: string) => void;
}
  const NavBar: React.FC<NavBarProps> = ({onSearch}) => {
  const [searchItem, setSearchItem] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); 
  const wrapperRef = useRef<HTMLDivElement>(null);

  const fetchCitySuggestions = async (query: string) => {
    try {
      const res = await fetch(
        `https://api.weatherapi.com/v1/search.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${query}`
      );
      const data = await res.json();
      setSearchSuggestions(data);  //returns array
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  const handleSearchChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchItem(value);
    if (value.trim().length === 0) {
      setSearchSuggestions([]);
      setShowDropdown(false);
      return;
    }
    setShowDropdown(true);
    fetchCitySuggestions(value);   // 🔥live city suggestions
  };
  
  const handleKeyPress=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter" && searchItem.trim()!==""){
        onSearch(searchItem.trim());
        setSearchItem("");
    }
  };

  const toggleTheme=()=>{
    setIsDarkMode((prev)=>!prev);
  };
  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
    //close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSearchItem("");        
        setSearchSuggestions([]); // Clear input and suggestions
      }
    }
    // Add event listener
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDarkMode]);
  
  return ( 
    <div className="container-fluid px-4 py-4">
      <div className="row d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
        {/* Search bar */}
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 head flex-grow-1 me-3">
        <div className="search-wrap position-relative" ref={wrapperRef}>
          <InputGroup className="searchbar ">
            <InputGroup.Text className="search-icon">
            <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search City..."
              value={searchItem}
              onChange={handleSearchChange}
              onKeyDown={handleKeyPress}
              className="search-input"
            />
          </InputGroup> 
          {showDropdown && (
        <ListGroup className="suggestion-dropdown shadow-sm ">
          {searchSuggestions.length > 0 ? (
            searchSuggestions.map((city: any, index) => (
              <ListGroup.Item
                  key={index}
                  action
                  onClick={() => {
                  onSearch(city.name);
                  setShowDropdown(false);
                  setSearchItem("");
                }}
              >
          {city.name}, {city.region}, {city.country}
        </ListGroup.Item>
      ))
      ) : (
       <ListGroup.Item>No matches found</ListGroup.Item>
      )}
        </ListGroup>
      )}
          </div>
        </div>
        {/* Light/Dark mode toggle placeholder */}
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 head text-end">
          <button 
            className={`btn toggle-btn head
              ${
                isDarkMode ? "dark" : "light"
              }
              `}
            onClick={toggleTheme}>
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
