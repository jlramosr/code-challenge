export const OPEN_DIALOG = 'OPEN_DIALOG';
export const CLOSE_DIALOG = 'CLOSE_DIALOG';

export const openDialog = articleId => ({
  type: OPEN_DIALOG,
  articleId,
});

export const closeDialog = () => ({
  type: CLOSE_DIALOG,
});
