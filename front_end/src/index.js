require('./style.scss');

var React = require('react');
var ReactDOM = require('react-dom');
// var SearchBar = require('SearchBar');

class SearchBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
  }

  handleQueryChange(e){
    this.setState({
      query: e.target.value
    });
  }

  handleSearch(e) {
    e.preventDefault();

    let self = this;
    let query = this.state.query;
    let url = this.props.url;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
          self.setState({
            query: JSON.parse(xhr.response)
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
        <form className="searchForm" onSubmit={this.handleSearch.bind(this)}>
          <input
            type="text"
            placeholder="Type Something..."
            value={this.state.query}
            onChange={this.handleQueryChange.bind(this)}
          />
          <input
            type="submit"
            value="SEARCH"
          />
        </form>
        <input
          list="autocomplete"
          type="text"
          placeholder="Type Something..."
          value={this.state.query}
        />
        <datalist id="autocomplete">
          <option value="Chrome" />
          <option value="Firefox" />
          <option value="Internet Explorer" />
          <option value="Opera" />
          <option value="Safari" />
        </datalist>
      </div>
    );
  }
}

ReactDOM.render(< SearchBar url="http://127.0.0.1:9393/" />, document.getElementById('root'));
