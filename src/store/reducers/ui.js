import { OPEN_DIALOG, CLOSE_DIALOG } from '../actions/ui';

const initialUIState = {
  dialog: {
    articleId: null,
    edit: false,
    open: false,
    success: false,
  },
};

const ui = (state = initialUIState, action) => {
  switch (action.type) {
    case OPEN_DIALOG:
      return {
        ...state,
        dialog: {
          articleId: action.articleId,
          edit: action.edit,
          open: true,
          success: false,
        },
      };
    case CLOSE_DIALOG:
      return {
        ...state,
        dialog: {
          ...state.dialog,
          articleId: null,
          open: false,
          success: action.success,
        },
      };
    default:
      return state;
  }
};

export default ui;
