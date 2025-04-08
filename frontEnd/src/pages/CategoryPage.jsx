import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { Spinner, Alert } from 'react-bootstrap'

const CategoryPage = () => {
  const { categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    if (!categoryId) {
      setError('ID da categoria não especificado')
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const productsRes = await fetch(
          `http://localhost:5000/api/category/${categoryId}/products`,
        )

        if (!productsRes.ok) throw new Error('Erro ao buscar produtos')
        const productsData = await productsRes.json()
        setProducts(productsData)

        const categoryRes = await fetch(
          `http://localhost:5000/api/category/${categoryId}`,
        )

        if (!categoryRes.ok) throw new Error('Categoria não encontrada')
        const categoryData = await categoryRes.json()
        setCategoryName(categoryData.name)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryId])

  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return (
      <Alert variant="danger" className="m-5">
        {error}
      </Alert>
    )
  }

  return (
    <div className="container my-5 category-page">
      <h2 className="text-center mb-4">{categoryName}</h2>
      {products.length === 0 ? (
        <Alert variant="info" className="mt-4 text-center">
          Nenhum Produto encontrado nesta categoria
        </Alert>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              key={product.id}
            >
              <ProductCard product={product} isCategoryPage />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryPage
