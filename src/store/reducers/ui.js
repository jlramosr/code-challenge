import { OPEN_DIALOG, CLOSE_DIALOG } from '../actions/ui';

const initialUIState = {
  dialog: {
    articleId: null,
    open: false,
  },
};

const ui = (state = initialUIState, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        dialog: {
          articleId: action.articleId,
          open: true,
        },
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        dialog: {
          articleId: null,
          open: false,
        },
      };
    default:
      return state;
  }
};

export default ui;
