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

    case actionTypes.SEARCH:
      return {
        ...state,
        input: action.e.target.value,
      };

    case actionTypes.SEARCHARRAY:
      return {
        ...state,
        newArr: [...action.arr],
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
      };

    case actionTypes.TAGARR:
      return {
        ...state,
        tagArr: [...action.data],
        tag: action.tag,
        isClickTag: true,
      };

    case actionTypes.DELETETAG:
      return {
        ...state,
        isClickTag: false,
        tag: "",
      };

    default:
      break;
  }
  return state;
};

export default reducer;
