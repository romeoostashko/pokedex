import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";
import classes from "./Tag.module.css";

const Tag = (props) => {
  return (
    <div
      className={props.tag ? classes.Tag : classes.TagInvisible}
      onClick={props.DeleteTag}
    >
      <span>{props.tag}</span>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    tag: state.tag,
    isClickTag: state.isClickTag,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteTag: (e) => dispatch({ type: actionTypes.DELETETAG, e }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
