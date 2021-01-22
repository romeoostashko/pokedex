import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <div>
      <div className={classes.NumberPokemonsList}>
        <p>The quantity of Pokemons on the page:</p>
        <select onChange={(e) => props.OnSelect(e)} name="select">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>

      <div className={classes.Navigation}>
        <button
          style={props.stylePrev}
          onClick={props.OnNavigationPrev}
          className={classes.Prev}
          disabled={props.disabledPrev}
        >
          Previous
        </button>

        <button
          style={props.styleNext}
          onClick={props.OnNavigationNext}
          className={classes.Next}
          disabled={props.disabledNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
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
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
