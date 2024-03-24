//Basic imports
import { useState } from 'react';
import { Button } from 'react-bootstrap';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

//Search bar component
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    //Writing event
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    //Submint event
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit} style={{ color: 'white' }}>
            <p>Nombre o número</p>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
            />
            <Button variant='danger' type="submit">Search</Button>
            <p className='subtitle'>¡Usa la búsqueda avanzada para encontrar Pokémon por su tipo, debilidad, habilidad y demás datos!</p>
        </form>
    );
};

export default SearchBar;