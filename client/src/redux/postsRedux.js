import axios from 'axios';
import { API_URL } from '../config';
import { resolve } from 'url';
import { rejects } from 'assert';

/* SELECTORS */

export const getPosts = ({ posts }) => posts.data;
export const getNumberOfPosts = ({ posts }) => posts.data.length;
export const getRequest = ({ posts }) => posts.request;

/* ACTIONS */

// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });

export const START_REQUEST = createActionName('START_REQUEST');
export const startRequest = () => ({ type: START_REQUEST });

export const END_REQUEST = createActionName('END_REQUEST');
export const endRequest = () => ({ type: END_REQUEST });

/* INITIAL STATE */

const initialState = {
   data: [],
   request: {
      pending: false
   }
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
   switch (action.type) {
      case LOAD_POSTS:
         return { ...statePart, data: action.payload };
      case START_REQUEST:
         return { ...statePart, request: { pending: true } };
      case END_REQUEST:
         return { ...statePart, request: { pending: false } };
      default:
         return statePart;
   }
}

/* THUNKS */

export const loadPostsRequest = () => {
   return async dispatch => {
      dispatch(startRequest());
      try {
         let res = await axios.get(`${API_URL}/posts`);
         await new Promise((resolve, reject) => setTimeout(resolve, 2000));
         dispatch(loadPosts(res.data));
         dispatch(endRequest());
      } catch (e) {
         dispatch(endRequest());
      }
   };
};
