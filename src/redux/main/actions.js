import {
    FETCH_DATA,
    UPVOTE_POST,
    SELECT_POST,
    ADD_COMMENT,
    ADD_SUB_COMMENT,
    SEARCH_POSTS,
    CREATE_POST
} from './types'

const fetchData = (posts) => () => {
    return { type: FETCH_DATA, payload: posts }
}
const reloadData = () => (dispatch, getState) => {
    let state = getState();
    let posts = state.main.posts
    return fetchData(posts)(dispatch)
}

const updateVoteCount = (postId, votes) => {
    return { type: UPVOTE_POST, payload: [postId, votes] }
}

const setSearched = filteredPosts => 
 ({type: SEARCH_POSTS, payload: filteredPosts })

const getPostsFromState = (state) => state.main.posts;

const findPostById = (postId, posts) => posts.find(post => post.id === postId);

const selectPost = (postId) => async (dispatch, getState) => {
    const posts = getPostsFromState(getState());
    const post = await findPostById(postId, posts);
    dispatch({ type: SELECT_POST, payload: post });
    return dispatch(findPost(post));
};

const findPost = (post) => {
    return { type: SELECT_POST, payload: post };
};

const createComment = (parentId, comment) => async (dispatch, getState) => {
    const posts = getPostsFromState(getState());
    const post = await findPostById(parentId, posts);
    dispatch({ type: ADD_COMMENT, payload: [parentId, comment] });
};

const createSubComment = (postId, parentId, newComment) => {
    dispatch({ type: ADD_SUB_COMMENT, payload: [postId, parentId, newComment] });
};

const searchPosts = (searchValue) => (dispatch, getState) => {
    const posts = getPostsFromState(getState());
    const filteredPosts = posts.filter(post => post.username.toLowerCase().includes(searchValue) 
        || post.description.toLowerCase().includes(searchValue));
    dispatch(setSearched(filteredPosts));
};

const createNewPost = (newPost) => ({ type: CREATE_POST, payload: newPost });

export default {
    fetchData,
    reloadData,
    updateVoteCount,
    selectPost,
    createComment,
    createSubComment,
    searchPosts,
    createNewPost,
};
