import React, { Component } from 'react'
import Input from './common/input'
class LoginForm extends Component {
  state = {
    account: {
      username: '',
      password: ''
    }
  }

  handleSubmit = e => {
    e.preventDefault()

    //callserver ....
    console.log('submitted')
  }

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account }
    account[input.name] = input.value
    this.setState({ account })
  }

  render() {
    const { username, password } = this.state.account
    return (
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={username}
            label="Username"
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={password}
            label="Password"
            onChange={this.handleChange}
          />
        </form>
        <button className="btn btn-primary">Login</button>
      </div>
    )
  }
}

export default LoginForm
