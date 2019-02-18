import React, { Component } from 'react'
import TableHeader from './common/tableHeader'
import Like from './common/like'

import TableBody from './common/tableBody'
class MoviesTable extends Component {
  // add new property set as jsx expression ! is really jus a good, POJO!
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    // set jsx objects as fn() with 'movie' as parameter
    {
      key: 'like',
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    },
    {
      key: 'delete',
      content: movie => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      )
    }
  ]
  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props
    return (
      <table className="table">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody data={movies} columns={this.columns} />
      </table>
    )
  }
}
export default MoviesTable
