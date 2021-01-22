import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";
import classes from "./PokemonsList.module.css";
import Navigation from "../Navigation/Navigation";
import Search from "../Search/Search";
import Tag from "../Tag/Tag";

class PokemonsList extends Component {
  state = {
    error: false,
    searched: false,
    count: 0,
  };

  componentDidMount() {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=1118&offset=0`)
      .then((respons) => {
        this.props.OnAxios(respons.data);
      });
  }
  //--- Search input---
  searchInputHandler = (e) => {
    let arr = this.props.isClickTag
      ? [...this.props.tagArr]
      : [...this.props.arrPokemons];
    arr = arr.filter((pokemon) => {
      return pokemon.name.startsWith(e.target.value.toLowerCase());
    });
    if (arr.length > 0 && e.target.value) {
      this.setState({ count: this.state.count + 1 });
      this.props.SearchArray(arr);
      if (this.state.count === 0) {
        this.props.Defaultbegin();
      }
      this.setState({ searched: true });
    } else {
      this.props.OldBegin();
      this.setState({ count: 0 });
      this.setState({ searched: false });
    }
  };
  //---Search by tags---
  serchTagHandler = (e) => {
    console.log(e);
    let url = `https://pokeapi.co/api/v2/type/${e.target.innerText.toLowerCase()}`;
    axios.get(url).then((respons) => {
      this.props.TagArr(
        respons.data.pokemon.map((pok) => pok.pokemon),
        e.target.innerText
      );
    });
  };

  render() {
    let arr = "Loading...";
    if (this.props.arrPokemons.length > 0) {
      console.log(this.props.tagArr);
      arr = this.state.searched
        ? this.props.newArr
        : this.props.isClickTag
        ? this.props.tagArr
        : this.props.arrPokemons;

      arr = arr.slice(this.props.begin, this.props.begin + this.props.limit);
      arr = arr.map((pokemon, id) => (
        <Pokemon
          key={pokemon.name + id}
          url={pokemon.url}
          name={pokemon.name}
          clickTags={this.serchTagHandler}
        />
      ));
    }

    return (
      <div className={classes.PokemonsList}>
        <Navigation
          disabledNext={arr.length < this.props.limit ? true : false}
          disabledPrev={this.props.begin ? false : true}
        />
        <Search search={(e) => this.searchInputHandler(e)} />
        <div className={classes.Found}>
          {this.props.isClickTag || this.state.searched ? (
            <p>
              Found {this.props.result} pokemons.{" "}
              {this.props.result > this.props.limit
                ? "Use the button 'NEXT'"
                : ""}
            </p>
          ) : (
            " "
          )}
        </div>
        <Tag />
        <div className={classes.Arr}>{arr}</div>
      </div>
    );
  }
}
//-----------------------------------------------------
const mapStateToProps = (state) => {
  return {
    arrPokemons: state.arrPokemons,
    limit: state.limit,
    begin: state.begin,
    oldBegin: state.oldBegin,
    searched: state.searched,
    newArr: state.newArr,
    tagArr: state.tagArr,
    isClickTag: state.isClickTag,
    result: state.result,
  };
};
//-----------------------------------------------------
const mapDispatchToProps = (dispatch) => {
  return {
    OnAxios: (resp) => dispatch({ type: actionTypes.AXIOS, resp }),
    SearchArray: (arr) => dispatch({ type: actionTypes.SEARCHARRAY, arr }),
    Defaultbegin: () => dispatch({ type: actionTypes.DEFAULTBEGIN }),
    OldBegin: () => dispatch({ type: actionTypes.OLDBEGIN }),
    TagArr: (data, tag) => dispatch({ type: actionTypes.TAGARR, data, tag }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsList);
