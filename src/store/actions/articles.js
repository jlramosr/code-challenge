import {
  FETCH_ARTICLES_QUERY,
  FETCH_ARTICLE_QUERY,
  CREATE_ARTICLE_MUTATION,
  UPDATE_ARTICLE_MUTATION,
  DELETE_ARTICLE_MUTATION,
} from '../../api/queries';
import request from '../../api/request';

export const FETCHING_ARTICLES = 'FETCHING_ARTICLES';
export const FETCHING_ARTICLES_ERROR = 'FETCHING_ARTICLES_ERROR';
export const RECEIVE_ARTICLES = 'RECEIVE_ARTICLES';
export const FETCHING_ARTICLE = 'FETCHING_ARTICLE';
export const FETCHING_ARTICLE_ERROR = 'FETCHING_ARTICLE_ERROR';
export const RECEIVE_ARTICLE = 'RECEIVE_ARTICLE';
export const CREATING_ARTICLE = 'CREATING_ARTICLE';
export const CREATING_ARTICLE_ERROR = 'CREATING_ARTICLE_ERROR';
export const CREATE_ARTICLE = 'CREATE_ARTICLE';
export const UPDATING_ARTICLE = 'UPDATING_ARTICLE';
export const UPDATING_ARTICLE_ERROR = 'UPDATING_ARTICLE_ERROR';
export const UPDATE_ARTICLE = 'UPDATE_ARTICLE';
export const REMOVING_ARTICLE = 'REMOVING_ARTICLE';
export const REMOVING_ARTICLE_ERROR = 'REMOVING_ARTICLE_ERROR';
export const REMOVE_ARTICLE = 'REMOVE_ARTICLE';

const fetchingArticlesAction = () => ({
  type: FETCHING_ARTICLES,
});

const errorFetchingArticlesAction = error => ({
  type: FETCHING_ARTICLES_ERROR,
  error,
});

const receiveArticlesAction = articles => ({
  type: RECEIVE_ARTICLES,
  articles,
});

const fetchingArticleAction = articleId => ({
  type: FETCHING_ARTICLE,
  articleId,
});

const errorFetchingArticleAction = error => ({
  type: FETCHING_ARTICLE_ERROR,
  error,
});

const receiveArticleAction = (articleId, values) => ({
  type: RECEIVE_ARTICLE,
  articleId,
  values,
});

const creatingArticleAction = () => ({
  type: CREATING_ARTICLE,
});

const errorCreatingArticleAction = error => ({
  type: CREATING_ARTICLE_ERROR,
  error,
});

const createArticleAction = (articleId, values) => ({
  type: CREATE_ARTICLE,
  articleId,
  values,
});

const updatingArticleAction = articleId => ({
  type: UPDATING_ARTICLE,
  articleId,
});

const errorUpdatingArticleAction = (articleId, error) => ({
  type: UPDATING_ARTICLE_ERROR,
  articleId,
  error,
});

const updateArticleAction = (articleId, values) => ({
  type: UPDATE_ARTICLE,
  articleId,
  values,
});

const removingArticleAction = articleId => ({
  type: REMOVING_ARTICLE,
  articleId,
});

const errorRemovingArticleAction = (articleId, error) => ({
  type: REMOVING_ARTICLE_ERROR,
  articleId,
  error,
});

const removeArticleAction = articleId => ({
  type: REMOVE_ARTICLE,
  articleId,
});


const fetchArticles = () => async dispatch => {
  dispatch(fetchingArticlesAction());
  try {
    const { data: { articles } } = await request(FETCH_ARTICLES_QUERY);
    dispatch(receiveArticlesAction(articles));
  } catch (error) {
    dispatch(errorFetchingArticlesAction(error));
  }
};

const fetchArticle = articleId => async dispatch => {
  dispatch(fetchingArticleAction());
  try {
    const { data: { article } } = await request(FETCH_ARTICLE_QUERY, { id: articleId });
    dispatch(receiveArticleAction(article));
  } catch (error) {
    dispatch(errorFetchingArticleAction(error));
  }
};

const createArticle = values => async dispatch => {
  dispatch(creatingArticleAction());
  try {
    await request(CREATE_ARTICLE_MUTATION, values);
    dispatch(createArticleAction(values));
  } catch (error) {
    dispatch(errorCreatingArticleAction(error));
  }
};

const updateArticle = (articleId, values) => async dispatch => {
  dispatch(updatingArticleAction());
  try {
    await request(UPDATE_ARTICLE_MUTATION, { id: articleId, ...values });
    dispatch(updateArticleAction(articleId, values));
  } catch (error) {
    dispatch(errorUpdatingArticleAction(articleId, error));
  }
};

const removeArticle = articleId => async dispatch => {
  dispatch(removingArticleAction());
  try {
    await request(DELETE_ARTICLE_MUTATION, { id: articleId });
    dispatch(removeArticleAction(articleId));
  } catch (error) {
    dispatch(errorRemovingArticleAction(articleId, error));
  }
};

export {
  fetchArticles,
  fetchArticle,
  createArticle,
  updateArticle,
  removeArticle,
};
