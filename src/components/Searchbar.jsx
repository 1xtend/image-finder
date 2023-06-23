import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="Searchbar">
      <form
        className="SearchForm"
        onSubmit={(e) => {
          onSubmit(e, searchQuery);
        }}
      >
        <button type="submit" className="SearchForm-button">
          <BiSearch fontSize={20} />
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
    </header>
  );
}

export default Searchbar;
