// this hook is going to make an api call to the products endpoint
// specified in sub.js, and it is going to return the data to the client



import { useEffect, useReducer } from "react";
import axios from "axios";


interface Plan {
    id: string;
    name: string;
    price: {
        amount: number;
        id: string;
    };
}

interface State {
  data: Plan[] | null;
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  data: null,
  error: null,
  loading: false,
};

enum ActionType {
    LOADING,
    SUCCESS,
    FAILED
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: Plan[] }
  | { type: ActionType.FAILED; payload: string };

const reducer = (_: State, action: Action) => {
    switch(action.type){
        case ActionType.LOADING:
            return {                
                loading: true,
                error: null,
                data: null
            }
        case ActionType.FAILED:
            return {
                loading: false,
                error: action.payload,
                data: null                
            }
        case ActionType.SUCCESS:
            return {
                loading: false,
                error: null,
                data: action.payload                
            }
        default:
            return initialState;
    }
};

const useMovie = (id: string) => {
  const [{data, loading, error}, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    dispatch({type: ActionType.LOADING})
    try {
      const response = await axios.get(`http://localhost:8080/movie/${id}`);      
      dispatch({ type: ActionType.SUCCESS, payload: response.data })
    } catch (error) {
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong" })
    }
  };

  return { data, loading, error };
};

export default useMovie;

