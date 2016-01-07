import React from 'react';
import ReactTypeahead from 'react-typeahead'

export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      autocomplete: []
    };
  }

  handleQueryChange(e){
    let self = this;
    let query = e.target.value;
    let url = this.props.url + 'auto';

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

  handleSearch(e) {
    e.preventDefault();
    debugger;
    // let self = this;
    // let query = this.state.query;
    // let url = this.props.url;
    //
    // let xhr = new XMLHttpRequest();
    // xhr.open('POST', url, true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.onload = function() {
    //   if (xhr.status === 200) {
    //     self.setState({
    //       query: JSON.parse(xhr.response)
    //     });
    //   } else {
    //     console.error(url, xhr.status);
    //   }
    // };
    // xhr.send(JSON.stringify({
    //     query: query,
    // }));
  }

  render() {
    return (
      <div className="searchBar">
        <ReactTypeahead.Typeahead
          placeholder="Start Typing..."
          onChange={this.handleQueryChange.bind(this)}
          options={this.state.autocomplete}
          customClasses={{
            typeahead: "topcoat-list",
            input: "topcoat-text-input",
            results: "topcoat-list__container",
            listItem: "topcoat-list__item",
          }}
        />
        <input
          type="submit"
          value="SEARCH"
          onClick={this.handleSearch.bind(this)}
        />
      </div>
    );
  }
}
