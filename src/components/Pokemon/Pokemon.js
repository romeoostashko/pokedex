import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Pokemon.module.css";
import axios from "axios";

class PokemonLayout extends Component {
  state = {
    img: "",
    tags: [],
  };

  componentDidMount() {
    axios.get(this.props.url).then((response) => {
      this.setState({
        img: response.data.sprites.front_default,
        tags: response.data.types,
      });
      //this.props.updateData(
      //   response.data.types,
      //  response.data.name,
      //  this.props.url
      // );
    });
  }

  render() {
    let tags = this.state.tags.map((iteam, idx) => (
      <span onClick={this.props.clickTags} key={Date.now() + idx}>
        {iteam.type.name.toUpperCase()}
      </span>
    ));

    return (
      <div className={classes.Pokemon}>
        {this.state.img ? (
          <img src={this.state.img} alt={this.props.name} />
        ) : (
          "Loading..."
        )}

        <div>{tags}</div>
        <h4>{this.props.name.toUpperCase()}</h4>
      </div>
    );
  }
}
// ------------------------------------
const mapStateToProps = (state) => {
  return {};
};
//------------------------------------
const mapDispatchToProps = (dispatch) => {
  return {
    OnAxios: (data) => dispatch({ type: "AXIOS", resp: { data } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PokemonLayout);
