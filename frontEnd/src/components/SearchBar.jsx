import PropTypes from 'prop-types'
import React from 'react'
import { BiSearch } from 'react-icons/bi'

const SearchBar = ({ value, onChange, onSubmit, isMobile }) => (
  <form
    className={`d-flex ${isMobile ? 'w-100' : 'flex-grow-1 mx-3'}`}
    onSubmit={onSubmit}
    role="search"
  >
    <input
      type="search"
      className="form-control me-2"
      placeholder="Buscar Produtos"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Buscar Produtos"
    />
    <button type="submit" className="btn btn-light" aria-label="Executar busca">
      <BiSearch className="fs-4" />
    </button>
  </form>
)

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
}

export default SearchBar
