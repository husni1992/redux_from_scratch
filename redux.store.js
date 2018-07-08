const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const RESET_STATE = "RESET_STATE";

let counter = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload;
    case DECREMENT:
      return state - action.payload;
    case RESET_STATE:
      return (state = 0);
    default:
      return state;
  }
};

let createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    // listeners.forEach(listener => listener()); // original
    listeners.forEach(listener => listener(state));
  };

  const subscribe = listener => {
    listeners.push({
      listener
    });
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  dispatch({});

  return {
    getState,
    dispatch,
    subscribe
  };
};

const store = createStore(counter);

store.subscribe(function(state) {
  document.getElementById("p1").innerHTML = state;
});

store.subscribe(function(state) {
  document.getElementById("p2").innerHTML = state;
});

let getInputNumber = function() {
  const inputText = document.getElementById("textbox_id").value;
  return parseInt(inputText) ? parseInt(inputText) : 1;
}

function increment() {
  store.dispatch({ type: INCREMENT, payload: getInputNumber() });
}

function decrement() {
  store.dispatch({ type: DECREMENT, payload: getInputNumber() });
}

function reset() {
  store.dispatch({ type: RESET_STATE });
}
