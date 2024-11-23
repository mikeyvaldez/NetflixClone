/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";
import axios from "axios";
import { Movie } from "../types";
import Cookie from "universal-cookie";
import dotenv from "dotenv";

dotenv.config()
const url = process.env.EXPRESS_URL;

const cookie = new Cookie();

interface State {
  data: Movie | null;
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
  FAILED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: Movie }
  | { type: ActionType.FAILED; payload: string };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ActionType.FAILED:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    case ActionType.SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    default:
      return initialState;
  }
};

const useMovie = (id: string) => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const sessionToken = cookie.get("session_token");
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get(`${url}/movie/${id}`, {
        headers: {
          ...(sessionToken
            ? { Authorization: `Bearer ${sessionToken}` }
            : null),
        },
      });
      dispatch({ type: ActionType.SUCCESS, payload: response.data });
    } catch (error: any) {
      dispatch({ type: ActionType.FAILED, payload: error?.response?.data?.errors[0].msg });
    }
  };

  return { data, loading, error };
};

export default useMovie;
