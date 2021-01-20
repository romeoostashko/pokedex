import React, { Component } from "react";
import axios from "axios";
import PokemonLayout from "../PokemonLayout/PokemonLayout";
import classes from "./PokemonsList.module.css";

class PokemonsList extends Component {
  state = {
    arrPokemons: [],
    numberPokemonsList: 10,
    offset: 0,
    error: false,
    selected: false,
  };

  componentDidMount() {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=${this.state.numberPokemonsList}&offset=${this.state.offset}`
      )
      .then((respons) => {
        console.log("axios");
        this.setState({ arrPokemons: respons.data.results });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  componentDidUpdate() {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon?limit=
        ${this.state.numberPokemonsList}&offset=
        ${this.state.offset}`
      )
      .then((respons) => {
        console.log("axios");
        if (this.state.selected) {
          this.setState({ arrPokemons: respons.data.results, selected: false });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }
  selectHandler = (e) => {
    this.setState({ numberPokemonsList: +e.target.value });
    console.log(this.state);
    this.setState({ selected: true });
  };

  render() {
    console.log("-render-");
    const arr = this.state.arrPokemons.map((pokemon) => (
      <PokemonLayout name={pokemon.name} key={pokemon.name} url={pokemon.url} />
    ));
    return (
      <div className={classes.PokemonsList}>
        <div className={classes.NumberPokemonsList}>
          <p>The quantity of Pokemons on the page.</p>
          <select onClick={this.selectHandler} name="select">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div className={classes.Navigation}>
          <span className={classes.Prev}>Previous</span>
          <span className={classes.Next}>Next</span>
        </div>
        <div className={classes.Arr}>{arr}</div>
      </div>
    );
  }
}

export default PokemonsList;
