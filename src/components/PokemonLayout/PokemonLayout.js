import React, { Component } from "react";
import classes from "./PokemonLayout.module.css";
import axios from "axios";

class PokemonLayout extends Component {
  state = {
    img: "",
  };
  componentDidMount() {
    axios.get(this.props.url).then((response) => {
      this.setState({ img: response.data.sprites.front_default });
    });
  }
  render() {
    return (
      <div className={classes.Pokemon}>
        <img src={this.state.img} alt={this.props.name} />
        <h4>{this.props.name.toUpperCase()}</h4>
      </div>
    );
  }
}
export default PokemonLayout;
