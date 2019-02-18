import React, { Component } from 'react'
import MoviesTable from './moviesTable'
import ListGroup from './common/listGroup'
import Pagination from './common/pagination'
import { getGenres } from '../services/fakeGenreService'
import { getMovies } from '../services/fakeMovieService'
import { paginate } from '../utils/paginate'
import _ from 'lodash'
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: 'title', order: 'asc' }
    // selectedGenre: null,
  }

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()]
    //_id: '' gets rid of key warning b/c rest of genres had own ids, now was comin up undefined..
    this.setState({ _id: '', movies: getMovies(), genres })
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
    this.setState({ selectedGenre: genre, currentPage: 1 })
  }

  handleSort = path => {
    const sortColumn = { ...this.state.sortColumn }
    if (sortColumn.path === path) {
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    } else {
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    this.setState({ sortColumn })
  }

  render() {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn
    } = this.state

    if (filteredCount === 0) return <p> There are no movies in the database.</p>

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    )

    const filteredCount = filteredMovies.length

    const movies = paginate(sorted, currentPage, pageSize)

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filteredCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
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
