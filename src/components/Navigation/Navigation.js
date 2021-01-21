import React from "react";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  return (
    <div>
      <div className={classes.NumberPokemonsList}>
        <p>The quantity of Pokemons on the page:</p>
        <select onChange={props.click} name="select">
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>

      <div className={classes.Navigation}>
        <span
          style={props.stylePrev}
          onClick={props.prev}
          className={classes.Prev}
        >
          Previous
        </span>

        <span
          style={props.styleNext}
          onClick={props.next}
          className={classes.Next}
        >
          Next
        </span>
      </div>
    </div>
  );
};

export default Navigation;
