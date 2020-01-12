import React, {useState, useEffect} from 'react';
import {navsearch} from './Navbar.module.scss';
import {Link} from 'react-router-dom';

/* 
This component appears in the NavBar.
*/
const NavbarSearchBox = () => {
  const [searchText, setSearchText] = useState("");

  const handleChange = e => {
    setSearchText(e.target.value);
  }
  
  return (
    <div className={`${navsearch} navbar-start control`}>
      <input className={` input`} type='text' placeholder='Search' onChange={e => handleChange(e)} value={searchText}/>
      {/* <button onClick={handleSearch}>Search</button> */}
      <Link to={`/search/${searchText}`}>Go</Link>
    </div>
  );
};

export default NavbarSearchBox;
