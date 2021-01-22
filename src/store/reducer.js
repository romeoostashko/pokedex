import * as actionTypes from "./actions";
const initialState = {
  arrPokemons: [],
  limit: 10,
  begin: 0,
  oldBegin: 0,
  beginSearch: 0,
  searched: false,
  newArr: [],
  end: 10,
  count: 0,
  tagArr: [],
  isClickTag: false,
  result: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AXIOS:
      return {
        ...state,
        arrPokemons: [...action.resp.results],
      };

    case actionTypes.SELECT:
      return {
        ...state,
        limit: +action.e.target.value,
      };

    case actionTypes.NAVNEXT:
      return {
        ...state,
        begin: state.begin + state.limit,
      };

    case actionTypes.NAVPREV:
      return {
        ...state,
        begin: state.begin - state.limit,
      };

    case actionTypes.SEARCHARRAY:
      return {
        ...state,
        newArr: [...action.arr],
        result: action.arr.length,
      };

    case actionTypes.DEFAULTBEGIN:
      return {
        ...state,
        oldBegin: state.begin,
        begin: 0,
      };

    case actionTypes.OLDBEGIN:
      return {
        ...state,
        begin: state.oldBegin,
        result: 0,
      };

    case actionTypes.TAGARR:
      return {
        ...state,
        tagArr: [...action.data],
        tag: action.tag,
        isClickTag: true,
        result: action.data.length,
      };

    case actionTypes.DELETETAG:
      return {
        ...state,
        isClickTag: false,
        result: 0,
        tag: "",
      };

    default:
      break;
  }
  return state;
};

export default reducer;
