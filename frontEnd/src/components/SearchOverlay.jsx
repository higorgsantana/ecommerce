import PropTypes from 'prop-types'
import React from 'react'

const SearchOverlay = ({
  isOpen,
  searchTerm,
  onClose,
  onSubmit,
  onSearchChange,
}) => (
  <div className={`search-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
    <div className="search-content" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar Produtos"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          autoFocus
        />
        <button type="submit" className="btn btn-primary mt-2 w-100">
          Buscar
        </button>
      </form>
    </div>
  </div>
)

SearchOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onSearchChange: PropTypes.func.isRequired,
}

export default SearchOverlay
