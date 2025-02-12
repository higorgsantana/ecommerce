import { useEffect } from 'react'

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title
    return () => {
      document.title = 'PC Store'
    }
  }, [title])
}

export default useDocumentTitle
