//Basic imports
import { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

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
        <center>
        <Row style={{ color: 'white' }}>
            <Col className='search'>
                <form onSubmit={handleSubmit}>
                    <h4 style={{ paddingTop: '15px' }}>Nombre o número</h4>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        style={{ margin: '10px', padding: '5px' }}
                    />
                    <Button variant='danger' type="submit">Search</Button>
                    <p className='subtitle' style={{fontSize:'15px'}}>¡Usa la búsqueda avanzada para encontrar Pokémon por su tipo, debilidad, habilidad y demás datos!</p>
                </form>
            </Col>
            <Col className='search'>
                <div className='cuadrado'>
                    <p className='text-box'>Busca un Pokémon por su nombre o usando su número de la Pokédex Nacional.</p>
                </div>
            </Col>
        </Row>
        </center>
    );
};

export default SearchBar;