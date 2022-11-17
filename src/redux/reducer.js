const DELETE = "DELETE_POST";
const GET_POSTS = "GET_POSTS";
const SAVE_POST = "SAVE_POST";
const LOADING_TRUE = "LOADING_TRUE";
const LOADING_FALSE = "LOADING_FALSE";
const initialState = {
  posts: [],
  loader: false,
};
const BASE_URL = "https://637638f081a568fc25f90df1.mockapi.io/Posts";

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_POST:
      return { ...state, posts: action.newPostsSave };
    case GET_POSTS:
      return { ...state, posts: action.posts };
    case DELETE:
      return { ...state, posts: action.newPostsDelete };
    case LOADING_TRUE:
      return { ...state, loader: true };
    case LOADING_FALSE:
      return { ...state, loader: false };
    default:
      return state;
  }
};

export default postReducer;

export const deletePost = (id, postId) => async (dispatch, getState) => {
  dispatch({ type: LOADING_TRUE });
  const postDelete = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  //   const response = await postDelete.text();
  //   const state = getState();
  const posts = await fetch(BASE_URL);
  const newPostsDelete = await posts.json();
  //   const filteredPosts = state.posts.filter((element) => element.id != id);   /// depricated because of post ID
  if (posts) {
    dispatch({
      type: DELETE,
      newPostsDelete,
    });
    dispatch({ type: LOADING_FALSE });
  }
};

export const savePost = (post) => async (dispatch, getState) => {
  dispatch({ type: LOADING_TRUE });
  const response = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-type": "application/json",
    },
  });
  const posts = await fetch(BASE_URL);
  const newPostsSave = await posts.json();
  if (posts) {
    dispatch({
      type: SAVE_POST,
      newPostsSave,
    });
    dispatch({ type: LOADING_FALSE });
  }
};

export const getPosts = () => async (dispatch) => {
  dispatch({ type: LOADING_TRUE });
  const response = await fetch(BASE_URL);
  const posts = await response.json();
  dispatch({
    type: GET_POSTS,
    posts,
  });
  dispatch({ type: LOADING_FALSE });
};

export const allPosts = (state) => state.posts;
export const loadingState = (state) => state.loader;
