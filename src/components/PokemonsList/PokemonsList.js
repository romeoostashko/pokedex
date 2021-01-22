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
    isClickTag: false,
    searched: false,
    tag: null,
    count: 0,
    disabled: false,
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
    this.props.OnSearch(e);
    let arr = [...this.props.arrPokemons];
    arr = arr.filter((pokemon) => {
      return pokemon.name.startsWith(e.target.value);
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
    const style = {
      color: "#ccc",
      cursor: "default",
    };

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
          stylePrev={!this.props.begin ? style : null}
          click={(e) => this.props.OnSelect(e)}
          prev={this.props.OnNavigationPrev}
          next={this.props.OnNavigationNext}
        />
        <Search search={(e) => this.searchInputHandler(e)} />
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
    nextUrl: state.nextUrl,
    previousUrl: state.previousUrl,
    limit: state.limit,
    begin: state.begin,
    oldBegin: state.oldBegin,
    end: state.end,
    input: state.input,
    searched: state.searched,
    newArr: state.newArr,
    tagArr: state.tagArr,
    tag: state.tag,
    isClickTag: state.isClickTag,
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
    Defaultbegin: () => dispatch({ type: actionTypes.DEFAULTBEGIN }),
    OldBegin: () => dispatch({ type: actionTypes.OLDBEGIN }),
    TagArr: (data, tag) => dispatch({ type: actionTypes.TAGARR, data, tag }),
    DeleteTag: (e) => dispatch({ type: actionTypes.DELETETAG, e }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonsList);
