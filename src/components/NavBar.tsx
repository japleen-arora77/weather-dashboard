import { Form, InputGroup, ListGroup } from "react-bootstrap";
//import { FaSearch as FaSearchIcon } from "react-icons/fa";
import { useState, ChangeEvent, useEffect} from "react";
import "../styles/NavBar.css";

interface NavBarProps {
  onSearch: (city: string) => void;
}
//const apiKeyOfSearching="OPEN_WEATHER_API_KEY";

const NavBar: React.FC<NavBarProps> = ({onSearch}) => {
  const [searchItem, setSearchItem] = useState<string>("");
 // const [searchSuggestions, setSearchSuggestions] = useState<any[]>([]);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); 
  const handleSearchChange =async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    // if(loc.length>1){
    //   try{
    //       const res=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=5&appid=${apiKeyOfSearching}`);
    //       const data=await res.json();
    //       setSearchSuggestions(data);
    //   }
    //   catch(err){
    //     console.error("Error while fetching suggestions",err)
    //   }
    // }
    // else{
    //   setSearchSuggestions([]);
    // }
  };
  const handleKeyPress=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter" && searchItem.trim()!==""){
        onSearch(searchItem.trim());
        setSearchItem("");
    }
  };
  // const handleSuggestionClick = (city: string) => {
  //   setSearchItem(city);
  //   onSearch(city);
  //   setSearchSuggestions([]);
  // };

  const toggleTheme=()=>{
    setIsDarkMode((prev)=>!prev);
  };
  useEffect(()=>{
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  } , [isDarkMode]);

  return (
    <div className="container-fluid px-4 py-4">
      <div className="row d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">
        {/* Search bar */}
        <div className="col-lg-8 col-md-8 col-sm-8 col-xs-8 head flex-grow-1 me-3">
          <div className="search-wrap position-relative">
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
            {/* Dropdown suggestions */}
           {/* {searchSuggestions.length > 0 && (
            <ListGroup className="suggestion-dropdown shadow-sm">
              {searchSuggestions.map((sugg, index) => (
                <ListGroup.Item
                  key={index}
                  action
                  onClick={() =>
                    handleSuggestionClick(
                      `${sugg.name}, ${sugg.state ? sugg.state + ", " : ""}${
                        sugg.country
                      }`
                    )
                  }
                >
                  <strong>{sugg.name}</strong>
                  {sugg.state ? `, ${sugg.state}` : ""}{" "}
                  <span className="text-muted">({sugg.country})</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )} */}
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
