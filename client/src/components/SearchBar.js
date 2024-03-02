import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const values=['Paris', 'Rome', 'Ottawa', 'New Delhi', 'Bagdad', 'Brasilia', 'Seoul', 'Cape Town']

const SearchBar = () => {
    const navigate = useNavigate();
    // values = props
    const [searchInput, setSearchInput] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value)
        // navigate("/Search", { replace: true });
    };

    const handleSubmit = () => {
        if (searchInput.length > 0) {
            navigate("/Search");
        }
    }

    return (
        // <div style={{width:'100%', height: '0px'}}>
            <form onSubmit={handleSubmit} style={{height: '0px'}}>
            <input
                style={{backgroundColor: 'white', width: '100%', height: '50px'}}
                type="text" 
                placeholder="Search here"
                onChange={handleChange}
                value={searchInput} />
            </form>
        
        // </div>
    )
}

export default SearchBar;
