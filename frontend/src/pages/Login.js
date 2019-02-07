import React, { Component } from 'react'
import './Login.css'
import twitterLogo from '../twitter.svg'

export default class Login extends Component {
    state = {
        username: ''
    }

    handleSubmit = e => {
        e.preventDefault()

        const { username } = this.state
        if (!username.length) return

        localStorage.setItem('@GoTwitter:username', username)
        this.props.history.push('/timeline')
    }

    render() {
        return (
            <div className="login-wrapper">
                <img src={twitterLogo} alt="GoTwitter" />
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.username} onChange={(env) => this.setState({username: env.target.value })} placeholder="Nome de usuário" />
                    <button type="submit"> Entrar </button>
                </form>
            </div>
        )
    }
}