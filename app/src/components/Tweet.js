import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import { TiArrowBackOutline } from 'react-icons/ti/index'
import { TiHeartOutline } from 'react-icons/ti/index';
import { TiHeartFullOutline } from 'react-icons/ti/index';
import { handleToggleTweet } from '../actions/tweets';

class Tweet extends Component {

    toPrent = (e, id) => {
        e.preventDefault();

        // TODO: Handle Redirection to Parent
    }

    handleLike = (e) => {
        e.preventDefault();
        const { dispatch, tweet, authedUser } = this.props;
        dispatch( handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser: authedUser
        }));
    }

    render () {
        if (this.props.tweet) {
            const { tweet } = this.props;
            const { name, avatar, timestamp, text, hasLiked, likes, replies, parent } = tweet;

            if ( tweet === null ) {
                return <p>This tweet does not exist</p>
            }
            return (
                <div className='tweet'>
                    <img 
                        src={avatar} 
                        alt={`Avatar of ${name}`}
                        className="avatar"
                    />
                    <div className="tweet-info">
                        <div>
                            <span>{name}</span>
                            <div>{formatDate(timestamp)}</div>
                            {parent && (
                                <button className="replying-to" onClick={(e) => this.toPrent(e, parent.id)}>
                                    Replying to @{parent.author}
                                </button>
                            )}
                            <p>{text}</p>
                        </div>
                        <div className="tweet-icons">
                            <TiArrowBackOutline className="tweet-icon" />
                            <span>{replies !== 0 && replies}</span>
                            <button className='heart-button' onClick={this.handleLike}>
                                {hasLiked === true 
                                    ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                                    : <TiHeartOutline className="tweet-icon" />
                                }
                            </button>
                            <span>{likes !== 0 && likes}</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='tweet'>Tweet does not exist</div>
            );
        }
    }
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
    const tweet = tweets[id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null;
    return {
        authedUser,
        tweet: tweet.hasOwnProperty('author')
            ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet) 
            : null
    }
}

export default connect(mapStateToProps)(Tweet);