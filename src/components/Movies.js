import React, { Component } from 'react'
import Like from './common/like'
import ListGroup from './common/listGroup'
import Pagination from './common/pagination'
import { getGenres } from '../services/fakeGenreService'
import { getMovies } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate'

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null
  }

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()]

    this.setState({ movies: getMovies(), genres })
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

  handleGenreSelect = genre => {
    //reset page to 1 upon each genre selection
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre
    } = this.state

    if (filteredCount === 0) return <p> There are no movies in the database.</p>

    //if selected genre and has id- all genres has no id! so will get all movies
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies
    const filteredCount = filteredMovies.length
    const movies = paginate(filteredMovies, currentPage, pageSize)

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            //dont need b/c default props!
            // textProperty="name"
            // valueProperty="_id"
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filteredCount} movies in the database.</p>
          <table className="table">
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
                <tr key={movie._id}>
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
            itemsCount={filteredCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    )
  }
}

export default Movies
