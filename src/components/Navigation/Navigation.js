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
          onClick={props.OnNavigationPrev}
          className={classes.Prev}
          disabled={props.disabledPrev}
        >
          Previous
        </button>

        <button
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

const mapDispatchToProps = (dispatch) => {
  return {
    OnSelect: (e) => dispatch({ type: actionTypes.SELECT, e }),
    OnNavigationNext: () => dispatch({ type: actionTypes.NAVNEXT }),
    OnNavigationPrev: () => dispatch({ type: actionTypes.NAVPREV }),
  };
};
export default connect(null, mapDispatchToProps)(Navigation);
