import { fas } from "@fortawesome/free-solid-svg-icons";
import React, { Component, Fragment } from "react";
import {Link} from 'react-router-dom'
class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: ""
    };
  }
  onChange = e => {
    const { suggestions } = this.props;
    const userInput = e.currentTarget.value;
  
    const filteredSuggestions = suggestions.filter(
      suggestion =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
  
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  onClick = e => {
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
  };

  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;
  
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }
      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,
      state: {
        activeSuggestion,
        filteredSuggestions,
        showSuggestions,
        userInput
      }
    } = this;
  
    let suggestionsListComponent;
    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
          suggestionsListComponent = (
            <div>
            <ul class="suggestions">
              {filteredSuggestions.map((suggestion, index) => {
                let className;
      
                // Flag the active suggestion with a class
                if (index === activeSuggestion) {
                  className = "suggestion-active";
                }
                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
            </div>
          );
        } else {
          suggestionsListComponent = (
            <div class="no-suggestions">
              <em>No suggestions available.</em>
            </div>
          );
        }
      }
      return (
        <Fragment>
          <div  className=" autocomplete col-lg-4">
            <div>
              <input
                type="text"
                className="form-control w-75"
                variant = "success"
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={userInput}
              />
            </div>
            <div>
              {suggestionsListComponent}
            </div>
            <Link
              className="btn btn-outline-success " 
              id="search"
              style={{height: 'max-content'}}
              to={`/blogs/${this.state.userInput}`}>
                <i class="fa fa-search" aria-hidden="true"></i>
            </Link>
          </div>
        </Fragment>
      );
    }
  }
  
  export default Autocomplete;