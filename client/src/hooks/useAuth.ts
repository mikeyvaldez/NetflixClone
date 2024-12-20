import axios from "axios";
import Cookie from "universal-cookie";
import { useDispatch } from "react-redux"; // this is a hook
import { clearUser, setUser } from "../features/userSlice";
import dotenv from 'dotenv';

const cookie = new Cookie();
dotenv.config();

const url = process.env.EXPRESS_URL;


const useAuth = () => {
  const dispatch = useDispatch();

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await axios.post(`${url}/auth/login`, {
      email,
      password,
    });
    const { token, user } = response.data;
    cookie.set("session_token", token);
    dispatch(
      setUser({
        email: user.email,
        username: user.username,
      })
    );
    return response.data;
  };

  const signup = async ({
    email,
    password,
    username,
  }: {
    email: string;
    password: string;
    username: string;
  }) => {
    const response = await axios.post(`${url}/auth/signup`, {
      email,
      password,
      username,
    });
    const { token, user } = response.data;
    cookie.set("session_token", token);
    dispatch(
      setUser({
        email: user.email,
        username: user.username,
      })
    );
    return response.data;
  };

  const fetchUser = async () => {
    const sessionToken = cookie.get("session_token");
    try {
      const response = await axios.get(`${url}/auth/me`, {
        headers: {
          ...(sessionToken
            ? { Authorization: `Bearer ${sessionToken}` }
            : null),
        },
      });
      const user = response.data;

      if(!user){
        return dispatch(clearUser());
      }

      dispatch(
        setUser({
          email: user.email,
          username: user.username,
        })
      );
    } catch (error) {
        // ideally we would want to log any errors to a separate logging software like DataDog
        return dispatch(clearUser());
    }
  };

  const logout = () => {
    cookie.remove("session_token")
    return dispatch(clearUser());
  }

  return { signup, login, logout, fetchUser };
};

export default useAuth;
