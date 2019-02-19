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

  handleSort = sortColumn => {
    this.setState({ sortColumn })
  }

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn
    } = this.state

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    )
    const movies = paginate(sorted, currentPage, pageSize)
    return { totalCount: filteredMovies.length, data: movies }
  }
  render() {
    const { pageSize, currentPage, sortColumn } = this.state

    const { totalCount, data } = this.getPageData()

    if (totalCount === 0) return <p> There are no movies in the database.</p>

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
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={data}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
