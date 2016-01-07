import React from 'react';
import ReactTypeahead from 'react-typeahead'

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      autocomplete: [],
      results: []
    };
  }

  handleQueryChange(e){
    let self = this;
    let query = e.target.value;
    let url = this.props.url + 'auto';

    self.setState({
      results: []
    });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        self.setState({
          autocomplete: JSON.parse(xhr.response)
        });
      } else {
        console.error(url, xhr.status);
      }
    };
    xhr.send(JSON.stringify({
      query: query,
    }));
    this.setState({
      query: query
    });

  }
  handleSelection(selection) {
    let self = this;
    let query = selection;
    let url = this.props.url + query;

    // let xhr = new XMLHttpRequest();
    // xhr.open('GET', url, true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.onload = function() {
    //   if (xhr.status === 200) {
    //     self.setState({
    //       result: JSON.parse(xhr.response)
    //     });
    //   } else {
    //     console.error(url, xhr.status);
    //   }
    // };
  }
  handleSearch() {
    let self = this;
    let query = this.state.query;
    let url = this.props.url + "search";

    self.setState({
      autocomplete: []
    });

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        self.setState({
          results: JSON.parse(xhr.response)
        });
      } else {
        console.error(url, xhr.status);
      }
    };
    xhr.send(JSON.stringify({
        query: query,
    }));
  }

  render() {
    return (
      <div className="searchBar">
        <button
          onClick={this.handleSearch.bind(this)}
          className="topcoat-button--cta">
          Search!
        </button>
        <ReactTypeahead.Typeahead
          placeholder="Start Typing..."
          options={this.state.autocomplete}
          onChange={this.handleQueryChange.bind(this)}
          onOptionSelected={this.handleSelection.bind(this)}
          maxVisible={20}
          customClasses={{
            typeahead: "topcoat-list",
            input: "topcoat-text-input",
            results: "topcoat-list__container",
            listItem: "topcoat-list__item",
          }}
        />
        <div>
          <ul className="topcoat-list__container">
            {this.state.results.map(function(result, i){
              return (
                <li key={i} className="topcoat-list__item">{result}</li>
              )
            })}
          </ul>
        </div>
      </div>
    );
  }
}
