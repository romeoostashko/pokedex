import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import classes from "./PokemonsList.module.css";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";

class PokemonsList extends Component {
  state = {
    arrTags: [],
    error: false,
    selected: false,
    searched: false,
    tag: null,
  };

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`)
      .then((respons) => {
        this.props.OnAxios(respons.data);
      });
  }

  searchInputHandler = (e) => {
    this.props.OnSearch(e);
    let arr = [...this.props.arrPokemons];
    arr = arr.filter((pokemon) => {
      return pokemon.name.startsWith(e.target.value);
    });

    if (arr.length > 0 && e.target.value) {
      if (arr.length > this.props.limit) {
        arr = arr.splice(0, this.props.limit);
      }
      const newArr = arr.map((pokemon, id) => (
        <Pokemon
          key={pokemon.name + id}
          url={pokemon.url}
          name={pokemon.name}
        />
      ));
      this.props.SearchArray(newArr);
      this.setState({ searched: true });
    } else {
      this.setState({ searched: false });
    }
  };

  render() {
    const style = {
      color: "#ccc",
      cursor: "default",
    };

    let arr = "Loading...";
    if (this.props.arrPokemons.length > 0) {
      arr = this.props.arrPokemons;
      arr = arr.slice(this.props.begin, this.props.begin + this.props.limit);
      arr = arr.map((pokemon, id) => (
        <Pokemon
          key={pokemon.name + id}
          url={pokemon.url}
          name={pokemon.name}
        />
      ));
    }

    return (
      <div className={classes.PokemonsList}>
        <Navigation
          stylePrev={!this.props.begin ? style : null}
          styleNext={this.props.end < 1118 ? null : style}
          click={(e) => this.props.OnSelect(e)}
          prev={this.props.OnNavigationPrev}
          next={this.props.OnNavigationNext}
        />
        <Search search={(e) => this.searchInputHandler(e)} />
        <div className={classes.Arr}>
          {this.state.searched ? this.props.newArr : arr}
        </div>
      </div>
    );
  }
}
//-----------------------------------------------------
const mapStateToProps = (state) => {
  return {
    arrPokemons: state.arrPokemons,
    nextUrl: state.nextUrl,
    previousUrl: state.previousUrl,
    limit: state.limit,
    begin: state.begin,
    end: state.end,
    input: state.input,
    searched: state.searched,
    newArr: state.newArr,
  };
};
//-----------------------------------------------------
const mapDispatchToProps = (dispatch) => {
  return {
    OnAxios: (resp) => dispatch({ type: actionTypes.AXIOS, resp }),
    OnSelect: (e) => dispatch({ type: actionTypes.SELECT, e }),
    OnNavigationNext: () => dispatch({ type: actionTypes.NAVNEXT }),
    OnNavigationPrev: () => dispatch({ type: actionTypes.NAVPREV }),
    OnSearch: (e) => dispatch({ type: actionTypes.SEARCH, e }),
    SearchArray: (arr) => dispatch({ type: actionTypes.SEARCHARRAY, arr }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsList);
