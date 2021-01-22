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
    arrPokemons: [],
    arrSearchPokemon: [],
    numberPokemonsList: 10,
    arrTags: [],
    offset: 0,
    error: false,
    selected: false,
    nextUrl: null,
    previousUrl: null,
    url: null,
    searched: false,
    tag: null,
  };

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`)
      .then((respons) => {
        this.props.OnAxios(respons.data);
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }
  /*axiosUpdate = () => {
    axios
      .get(
        !this.state.url
          ? `https://pokeapi.co/api/v2/pokemon?limit=
    ${this.state.numberPokemonsList}&offset=
    ${this.state.offset}`
          : this.state.url
      )
      .then((respons) => {
        if (this.state.selected) {
          this.setState({
            arrPokemons: respons.data.results,
            nextUrl: respons.data.next,
            previousUrl: respons.data.previous,
            selected: false,
          });
        }
        if (this.state.url) {
          this.setState({
            arrPokemons: respons.data.results,
            nextUrl: respons.data.next,
            previousUrl: respons.data.previous,
            url: null,
          });
        }
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  };
  componentDidUpdate() {
    this.axiosUpdate();
  }
*/
  selectHandler = (e) => {
    this.props.OnSelect(e);

    /*this.setState({
      numberPokemonsList: +e.target.value,
      tag: null,
      selected: true,
    });*/
  };

  /*inputHandler = (e) => {
    if (!this.state.searched) {
      this.setState({
        arrSearchPokemon: [...this.state.arrPokemons],
        searched: true,
      });
    }
    let arr = [...this.state.arrPokemons];
    arr = arr.filter((pokemon) => {
      return pokemon.name.startsWith(e.target.value);
    });
    this.setState({ arrPokemons: arr });

    if (e.target.value === "" || e.target.value === " " || arr.length === 0) {
      this.setState({
        searched: false,
        selected: true,
        arrTags: [],
        tag: null,
      });
    }
  };*/

  /* updateData = (value, name, url) => {
    let obj = { name, url };
    obj.value = value.map((iteam) => iteam.type.name);
    let arrTags = [...this.state.arrTags];
    arrTags.push(obj);
    this.setState({ arrTags });
  };*/

  /*searchTagHandler = (e) => {
    let arr = [...this.state.arrTags];
    let arrFiltred = arr.filter((it) => {
      return (
        it.value.includes(e.target.innerText.toLowerCase()) ||
        it.value.includes(e.target.innerText.toLowerCase())
      );
    });
    
    this.setState({
      arrPokemons: arrFiltred,
      tag: <span>{e.target.innerText}</span>,
    });
  };*/

  /* deleteTagHandler = () => {
    this.setState({
      tag: null,
      selected: true,
      arrTags: [],
    });
  };*/

  /* navigationHandler = (direction) => {
    if (direction === "NEXT" && this.state.nextUrl) {
      this.setState({
        url: this.state.nextUrl,
        offset: this.state.offset + this.state.numberPokemonsList,
        tag: null,
        arrTags: [],
      });
    }
    if (direction === "PREV" && this.state.previousUrl) {
      this.setState({
        url: this.state.previousUrl,
        offset: this.state.offset - this.state.numberPokemonsList,
        tag: null,
        arrTags: [],
      });
    }
  };*/

  render() {
    const style = {
      color: "#ccc",
      cursor: "default",
    };

    let arr = "Loading...";
    if (this.props.arrPokemons.lenght > 0) {
      arr = this.state.arrPokemons.clice(0, this.props.quantity);
      arr = arr.map((pokemon, id) => (
        <Pokemon
          updateData
          clickTags
          key={pokemon.name + id}
          url={pokemon.url}
          name={pokemon.name}
        />
      ));
    }

    return (
      <div className={classes.PokemonsList}>
        {*/<Navigation
          stylePrev={!this.state.previousUrl ? style : null}
          styleNext={
            this.state.previousUrl || !this.state.NextUrl ? null : style
          }
          click={this.selectHandler}
          prev={this.navigationHandler.bind(this, "PREV")}
          next={this.navigationHandler.bind(this, "NEXT")}
        />
        <Search search={this.inputHandler} />
        <div
          onClick={this.deleteTagHandler}
          className={this.state.tag ? classes.Tag : null}
        >
          {this.state.tag}
        </div>*/}
        <div className={classes.Arr}>{arr}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrPokemons: state.arrPokemons,
    nextUrl: state.nextUrl,
    previousUrl: state.previousUrl,
    quantity: state.quantity,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    OnAxios: (data) => dispatch({ type: actionTypes.AXIOS, resp: { data } }),
    OnSelect: (e) => dispatch({ type: actionTypes.SELECT, e: { e } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsList);