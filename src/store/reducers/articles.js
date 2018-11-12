import { combineReducers } from 'redux';
import {
  FETCHING_ARTICLES,
  FETCHING_ARTICLES_ERROR,
  RECEIVE_ARTICLES,
  FETCHING_ARTICLE,
  FETCHING_ARTICLE_ERROR,
  RECEIVE_ARTICLE,
  CREATING_ARTICLE,
  CREATING_ARTICLE_ERROR,
  CREATE_ARTICLE,
  UPDATING_ARTICLE,
  UPDATING_ARTICLE_ERROR,
  UPDATE_ARTICLE,
  REMOVING_ARTICLE,
  REMOVING_ARTICLE_ERROR,
  REMOVE_ARTICLE,
} from '../actions/articles';

const initialFlowState = {
  fetchingAll: false,
  errorFetchingAll: null,
  fetchingOne: false,
  errorFetchingOne: null,
  changingOne: false,
  errorChangingOne: null,
};

const initialByIdState = {};

const initialAllIdsState = [];

const flow = (state = initialFlowState, action) => {
  switch (action.type) {
    case FETCHING_ARTICLES:
      return {
        ...state,
        fetchingAll: true,
        errorFetchingAll: null,
      };
    case FETCHING_ARTICLES_ERROR:
      return {
        ...state,
        fetchingAll: false,
        errorFetchingAll: action.error,
      };
    case RECEIVE_ARTICLES:
      return {
        ...state,
        fetchingAll: false,
        errorFetchingAll: null,
      };
    case FETCHING_ARTICLE:
      return {
        ...state,
        fetchingOne: true,
        errorFetchingOne: null,
      };
    case FETCHING_ARTICLE_ERROR:
      return {
        ...state,
        fetchingOne: false,
        errorFetchingOne: action.error,
      };
    case RECEIVE_ARTICLE:
      return {
        ...state,
        fetchingOne: false,
        errorFetchingOne: null,
      };
    case CREATING_ARTICLE:
    case UPDATING_ARTICLE:
    case REMOVING_ARTICLE:
      return {
        ...state,
        changing: true,
        errorChanging: null,
      };
    case CREATING_ARTICLE_ERROR:
    case UPDATING_ARTICLE_ERROR:
    case REMOVING_ARTICLE_ERROR:
      return {
        ...state,
        changing: false,
        errorChanging: action.error,
      };
    case CREATE_ARTICLE:
    case UPDATE_ARTICLE:
    case REMOVE_ARTICLE:
      return {
        ...state,
        changing: false,
        errorChanging: null,
      };
    default:
      return state;
  }
};

const byId = (state = initialByIdState, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return action.articles.reduce((articles, article) => ({
        ...articles,
        [article.id]: {
          ...article,
          id: article.id,
        },
      }), state);
    case RECEIVE_ARTICLE: {
      return {
        ...state,
        [action.articleId]: {
          ...action.values,
          id: action.articleId,
        },
      };
    }
    case CREATE_ARTICLE: {
      return {
        ...state,
        [action.articleId]: {
          ...action.values,
          id: action.articleId,
        },
      };
    }
    case UPDATE_ARTICLE:
      return {
        ...state,
        [action.articleId]: {
          ...action.values,
          id: action.articleId,
        },
      };
    case REMOVE_ARTICLE: {
      const { [action.articleId]: deleted, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};

const allIds = (state = initialAllIdsState, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return [...new Set([...state, ...action.articles.map(article => article.id)])];
    case RECEIVE_ARTICLE: {
      return [...new Set([...state, action.articleId])];
    }
    case CREATE_ARTICLE:
      return [action.articleId, ...state];
    case REMOVE_ARTICLE:
      return state.filter(id => action.articleId !== id);
    default:
      return state;
  }
};

export default combineReducers({ flow, byId, allIds });
