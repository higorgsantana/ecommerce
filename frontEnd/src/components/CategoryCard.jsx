import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card } from 'react-bootstrap'

const CategoryCard = ({ category }) => (
  <Link
    to={`/category/${category.id}`}
    className="text-decoration-none category-card"
    role="button"
    aria-label={`Ver categoria ${category.name}`}
  >
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={category.icon}
        alt={category.name}
        className="p-4"
        style={{ height: '200px', objectFit: 'contain' }}
      />
      <Card.Body>
        <Card.Title className="text-center category-title">
          {category.name}
        </Card.Title>
      </Card.Body>
    </Card>
  </Link>
)

CategoryCard.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
}

export default CategoryCard
