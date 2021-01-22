import * as actionTypes from "./actions";
const initialState = {
  arrPokemons: [],
  nextUrl: "",
  previousUrl: "",
  limit: 10,
  begin: 0,
  beginSearch: 0,
  searched: false,
  newArr: [],
  end: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AXIOS:
      return {
        ...state,
        arrPokemons: [...action.resp.results],
        previousUrl: action.resp.previous,
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
      console.log(action.e.target.value);
      return {
        ...state,
        input: action.e.target.value,
      };
    case actionTypes.SEARCHARRAY:
      console.log(action.arr);
      return {
        ...state,
        newArr: [action.arr],
      };
    default:
      break;
  }
  return state;
};

export default reducer;
