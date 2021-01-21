import React, { Component } from "react";
import classes from "./Search.module.css";

class Search extends Component {
  render() {
    return (
      <div className={classes.Search}>
        <input
          placeholder="Type the name of pokemon"
          onChange={this.props.search}
          type="text"
        />
      </div>
    );
  }
}

export default Search;
