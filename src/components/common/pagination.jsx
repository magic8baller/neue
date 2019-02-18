import React from 'react'
import _ from 'lodash'

const Pagination = ({ itemsCount, currentPage, pageSize, onPageChange }) => {
  console.log(currentPage)
  const pagesCount = Math.ceil(itemsCount / pageSize)

  //dont show pages if all on page!
  // if (pagesCount === 1) return null
  const pages = _.range(1, pagesCount + 1)
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {pages.map(page => (
          <li
            key={page}
            class={page === currentPage ? 'page-item active' : 'page-item'}
          >
            <a class="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Pagination
