import axios from 'axios';
import { API_URL } from '../config';

/* SELECTORS */

export const getRequest = ({ posts }) => posts.request;
export const getPosts = ({ posts }) => posts.data;
export const getNumberOfPosts = ({ posts }) => posts.data.length;
export const getSinglePost = ({ posts }) => posts.singlePost;
export const getPages = ({ posts }) => Math.ceil(posts.amount / posts.postsPerPage);

export const getPresentPage = ({ posts }) => posts.presentPage; // new add

/* ACTIONS */
// action name creator
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

export const START_REQUEST = createActionName('START_REQUEST');
export const startRequest = () => ({ type: START_REQUEST });

export const END_REQUEST = createActionName('END_REQUEST');
export const endRequest = () => ({ type: END_REQUEST });

export const ERROR_REQUEST = createActionName('ERROR_REQUEST');
export const errorRequest = error => ({ error, type: ERROR_REQUEST });

export const RESET_REQUEST = createActionName('RESET_REQUEST');
export const resetRequest = () => ({ type: RESET_REQUEST });

export const LOAD_POSTS = createActionName('LOAD_POSTS');
export const loadPosts = payload => ({ payload, type: LOAD_POSTS });

export const LOAD_SINGLE_POST = createActionName('LOAD_SINGLE_POST');
export const loadSinglePost = payload => ({ payload, type: LOAD_SINGLE_POST });

export const LOAD_POSTS_PAGE = createActionName('LOAD_POSTS_PAGE');
export const loadPostsByPage = payload => ({ payload, type: LOAD_POSTS_PAGE });

/* INITIAL STATE */

const initialState = {
   data: [],
   request: {
      pending: false,
      error: null,
      success: null
   },
   singlePost: {},
   amount: 0,
   postsPerPage: 10,
   presentPage: 1
};

/* REDUCER */

export default function reducer(statePart = initialState, action = {}) {
   switch (action.type) {
      case START_REQUEST:
         return { ...statePart, request: { pending: true, error: null, success: null } };
      case END_REQUEST:
         return { ...statePart, request: { pending: false, error: null, success: true } };
      case ERROR_REQUEST:
         return { ...statePart, request: { pending: false, error: action.error, success: false } };
      case RESET_REQUEST:
         return { ...statePart, request: { pending: false, error: null, success: null } };
      case LOAD_POSTS:
         return { ...statePart, data: action.payload };
      case LOAD_SINGLE_POST:
         return { ...statePart, singlePost: action.payload };
      case LOAD_POSTS_PAGE:
         return {
            ...statePart,
            postsPerPage: action.payload.postsPerPage,
            presentPage: action.payload.presentPage,
            amount: action.payload.amount,
            data: [...action.payload.posts]
         };
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
         // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
         dispatch(loadPosts(res.data));
         dispatch(endRequest());
      } catch (e) {
         dispatch(errorRequest(e.message));
      }
   };
};

export const loadSinglePostRequest = id => {
   return async dispatch => {
      dispatch(startRequest());
      try {
         let res = await axios.get(`${API_URL}/posts/${id}`);
         // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
         // await dispatch(loadSinglePost(res.data[0]));
         dispatch(loadPosts(res.data));
         dispatch(endRequest());
      } catch (e) {
         dispatch(errorRequest(e.message));
      }
   };
};

export const addPostRequest = post => {
   return async dispatch => {
      dispatch(startRequest());
      try {
         await axios.post(`${API_URL}/posts`, post);
         // let res = await axios.post(`${API_URL}/posts`, post);
         // await new Promise((resolve, reject) => setTimeout(resolve, 2000));
         dispatch(endRequest());
      } catch (e) {
         dispatch(errorRequest(e.message));
      }
   };
};

export const loadPostsByPageRequest = page => {
   return async dispatch => {
      dispatch(startRequest());
      try {
         const postsPerPage = 10;

         const startAt = (page - 1) * postsPerPage;
         const limit = postsPerPage;

         let res = await axios.get(`${API_URL}/posts/range/${startAt}/${limit}`);
         // await new Promise((resolve, reject) => setTimeout(resolve, 2000));

         const payload = {
            posts: res.data.posts,
            amount: res.data.amount,
            postsPerPage,
            presentPage: page
         };

         dispatch(loadPostsByPage(payload));
         dispatch(endRequest());
      } catch (e) {
         dispatch(errorRequest(e.message));
      }
   };
};
