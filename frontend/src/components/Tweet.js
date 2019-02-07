import React, { Component } from 'react'
import './Tweet.css' 
import like from '../like.svg'
import api from '../services/api';
export default class Tweet extends Component {

    like = async () => {
        const { _id } = this.props.tweet
        await api.post(`like/${_id}`)
    }

    render() {
        const { tweet } = this.props
        return (
            <li style={{ borderBottom: '1px #eee solid' }} className="tweet animated fadeIn">
                <strong>{tweet.author}</strong>
                <p>{tweet.content}</p>
                <button type='button' onClick={this.like}>
                    <img src={like} alt="like" />
                    {tweet.likes}
                </button>
                <br/>
            </li>
        )
    }
}