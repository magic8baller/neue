import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Movies from './components/Movies'
import NavBar from './components/navBar'
import MovieForm from './components/movieForm'
import LoginForm from './components/loginForm'
import Customers from './components/customers'
import Rentals from './components/rentals'
import NotFound from './components/notFound'

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    )
  }
}

export default App
