export const parseArticle = (rawArticle) => ({
  ...rawArticle.data,
  id: rawArticle.id,
  tags: rawArticle.tags,
  uid: rawArticle.uid
});
