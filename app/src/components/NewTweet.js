import React, { Component } from "react";
import { handleAddTweet } from "../actions/tweets";
import { connect } from "react-redux";
import { Redirect } from "react-router";

class NewTweet extends Component {

    state = {
        hasText: false,
        text: '',
        left: 280
    }

    calculateTweetsLeft = () => {
        return 280 - this.state.text.length;
    }

    handleChange = ( e ) => {
        const text = e.target.value;

        this.setState(() => ({
            hasText: text === '' || text === null ? false : true,
            text: text === '' || text === null ? '' : text,
            left: this.calculateTweetsLeft()
        }));
    };

    handleSubmit = ( e ) => {
        e.preventDefault();
        const { text } = this.state;
        const { dispatch, id } = this.props;
        dispatch( handleAddTweet( text, id ) );
        this.setState(() => ({
            hasText: false,
            text: '',
            toHome: id ? false : true
        }));
    };

    render () {

        if ( this.state.toHome ) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <h3 className="center">Compose</h3>
                <form className='new-tweet' onSubmit={ this.handleSubmit }>
                    <textarea 
                        placeholder="What is Happening?"
                        value={this.state.text}
                        onChange={this.handleChange}
                        className="textarea"
                        maxLength={280}>
                    </textarea>
                    <div className="tweet-length">{this.state.left}</div>
                    <button className="btn" type="submit" disabled={!this.state.hasText}>Submit</button>
                </form>
            </div>
        );
    }
}

export default connect()(NewTweet);
