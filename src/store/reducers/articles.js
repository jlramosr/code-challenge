import { combineReducers } from 'redux';
import { FETCHING_ARTICLES } from '../actions/items';
import { FETCHING_ARTICLES_ERROR } from '../actions/items';
import { RECEIVE_ARTICLES } from '../actions/items';
import { FETCHING_ARTICLE } from '../actions/items';
import { FETCHING_ARTICLE_ERROR } from '../actions/items';
import { RECEIVE_ARTICLE } from '../actions/items';
import { CREATING_ARTICLE } from '../actions/items';
import { CREATING_ARTICLE_ERROR } from '../actions/items';
import { CREATE_ARTICLE } from '../actions/items';
import { UPDATING_ARTICLE } from '../actions/items';
import { UPDATING_ARTICLE_ERROR } from '../actions/items';
import { UPDATE_ARTICLE } from '../actions/items';
import { REMOVING_ARTICLE } from '../actions/items';
import { REMOVING_ARTICLE_ERROR } from '../actions/items';
import { REMOVE_ARTICLE } from '../actions/items';

const initialFlowState = {
  fetchingAll: false,
  errorFetchingAll: null,
  fetchingOne: false,
  errorFetchingOne: null,
  changingOne: false,
  errorChangingOne: null,
}

const initialByIdState = {}

const initialAllIdsState = []

const flow = (state = initialFlowState, action) => {
  switch (action.type) {
    case FETCHING_ARTICLES:
      return {
        ...state,
        fetchingAll: true,
        errorFetchingAll: null,
      }
    case FETCHING_ARTICLES_ERROR:
      return {
        ...state,
        fetchingAll: false,
        errorFetchingAll: action.error,
      }
    case RECEIVE_ARTICLES:
      return {
        ...state,
        fetchingAll: false,
        errorFetchingAll: null,
      }
    case FETCHING_ARTICLE:
      return {
        ...state,
        fetchingOne: true,
        errorFetchingItem: null,
      }
    case FETCHING_ARTICLE_ERROR:
      return {
        ...state,
        fetchingOne: false,
        errorFetchingItem: action.error,
      }
    case RECEIVE_ARTICLE:
      return {
        ...state,
        fetchingOne: false,
        errorFetchingOne: null
      }
    case CREATING_ARTICLE:
    case UPDATING_ARTICLE:
    case REMOVING_ARTICLE:
      return {
        ...state,
        changing: true,
        errorChanging: null,
      }
    case CREATING_ARTICLE_ERROR:
    case UPDATING_ARTICLE_ERROR:
    case REMOVING_ARTICLE_ERROR:
      return {
        ...state,
        changing: false,
        errorChanging: error.action,
      }
    case CREATE_ARTICLE:
    case UPDATE_ARTICLE:
    case REMOVE_ARTICLE:
      return {
        ...state,
        changing: false,
        errorChanging: null,
      }
    default:
      return state
  }
}

const byId = (state = initialByIdState, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return Object.keys(action.articles).reduce((articles, articleId) => ({
        ...articles, 
        [articleId]: {
          ...action.articles[articleId],
          id: itemId
        }
      }), state)
    case RECEIVE_ARTICLE: {
      return {
        ...state,
        [action.articleId]: {
          ...action.values,
          id: action.articleId,
        }
      }
    }
    case CREATE_ARTICLE: {
      return {
        ...state,
        [action.articleId]: {
          ...action.values,
          id: action.articleId,
        }
      }
    }
    case UPDATE_ARTICLE:
      return {
        ...state,
        [action.articleId]: {
          ...action.values,
          id: action.articleId,
        }
      }
    case REMOVE_ARTICLE: {
      let { [action.articleId]: deleted, ...newState } = state
      return newState
    }
    default:
      return state
  }
}

const allIds = (state = initialAllIdsState, action) => {
  switch (action.type) {
    case RECEIVE_ARTICLES:
      return [...new Set(state, Object.keys(action.items))]
    case RECEIVE_ARTICLE:
      return state;
    case CREATE_ARTICLE:
      return state;
    case REMOVE_ARTICLE:
      return state;
    default:
      return state;
  }
}

export default combineReducers({ flow, byId, allIds })