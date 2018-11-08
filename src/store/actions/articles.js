import API from 'utils/api';

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
})

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
})

const creatingArticleAction = () => ({
  type: CREATING_ARTICLE,
});

const errorCreatingArticleAction = error => ({
  type: CREATING_ARTICLE_ERROR,
  error
});

const createArticleAction = (articleId, values) => ({
  type: CREATE_ARTICLE,
  articleId,
  values
});

const updatingArticleAction = (articleId) => ({
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
  error
});

const removeArticleAction = articleId => ({
  type: REMOVE_ARTICLE,
  articleId,
});


const fetchArticles = () => dispatch => {
  dispatch(fetchingArticlesAction())
  const params = {
    mainCollectionId: process.env.REACT_APP_ITEMS_URL,
  }
  return API(process.env.REACT_APP_ITEMS_SOURCE).fetch(params)
    .then(
      items => {
        dispatch(receiveArticlesAction(articles));
      },
      error => {
        console.error('An error occurred fetching articles', error);
        dispatch(errorFetchingArticlesAction(error));
      }
    )
}

const fetchArticle = articleId => dispatch => {
  dispatch(fetchingArticleAction())
  const params = {
    mainCollectionId: process.env.REACT_APP_ITEMS_URL,
    documentId: articleId,
  }
  return API(process.env.REACT_APP_ITEMS_SOURCE).fetch(params)
    .then(
      item => {
        dispatch(receiveArticleAction(articleId, item || {}));
      },
      error => {
        console.error(error);
        dispatch(errorFetchingArticleAction(error));
      }
    )
}

const createArticle = values => dispatch => {
  dispatch(creatingArticleAction())
  const params = {
    mainCollectionId: process.env.REACT_APP_ITEMS_URL,
    values,
  }
  return new Promise((resolve, reject) => {
    API(process.env.REACT_APP_ITEMS_SOURCE).create(params).then(
      documentIds => {
        dispatch(createArticleAction(articleId, values));
        resolve(documentIds);
      },
      error => {
        console.error(error);
        dispatch(errorCreatingArticleAction(error));
        reject(error);
      }
    )
  })
}

const updateArticle = (articleId, values) => dispatch => {
  dispatch(updatingArticleAction());
  const params = {
    mainCollectionId: process.env.REACT_APP_ITEMS_URL,
    documentIds: itemIds,
    values: newValues,
  }
  return new Promise((resolve, reject) => {
    API(process.env.REACT_APP_ITEMS_SOURCE).update(params).then(
      documentIds => {
        dispatch(updateArticleAction(documentIds, newValues));
        resolve(documentIds);
      },
      error => {
        console.error(error);
        dispatch(errorUpdatingArticleAction(articleId, error));
        reject(error);
      }
    )
  })
}

const removeArticle = articleId => dispatch => {
  dispatch(removingArticleAction());
  const params = {
    documentIds: articleId
  }
  return new Promise((resolve, reject) => {
    API(process.env.REACT_APP_ITEMS_SOURCE).remove(params).then(
      documentId => {
        dispatch(removeArticleAction(articleId))
        resolve(documentId)
      },
      error => {
        console.error(error)
        dispatch(errorRemovingArticleAction(articleId, error))
        reject(`An error occurred deleting item ${articleId}`, error)
      }
    )
  })
}

export {
  fetchArticles,
  fetchArticle,
  createArticle,
  updateArticle,
  removeArticle,
};