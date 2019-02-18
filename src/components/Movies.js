import React, { Component } from 'react'
import { getMovies } from '../services/fakeMovieService'
import Pagination from './common/pagination'
import Like from './common/like'

import { paginate } from '../utils/paginate'
class Movies extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id)
    this.setState({ movies })
  }

  handleLike = movie => {
    const movies = [...this.state.movies]
    const idx = movies.indexOf(movie)
    movies[idx] = { ...movies[idx] }
    movies[idx].liked = !movies[idx].liked
    this.setState({ movies })
    console.log('like clickdd')
  }

  handlePageChange = page => {
    this.setState({ currentPage: page })
  }

  render() {
    const count = this.state.movies.length
    const { movies: allMovies, pageSize, currentPage } = this.state

    if (count === 0) return <p> There are no movies in the database.</p>
    const movies = paginate(allMovies, currentPage, pageSize)
    return (
      <>
        <p>Showing {count} movies in the database.</p>
        <table class="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          itemsCount={count}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange}
        />
      </>
    )
  }
}

export default Movies
