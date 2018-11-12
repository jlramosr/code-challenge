export const FETCH_ARTICLES_QUERY = `{
  articles {
    author
    content
    published
    tags
    id
    title
  }
}`;

export const FETCH_ARTICLE_QUERY = `
  query article($id: String!) {
    article(id: $id) {
      author
      content
      published
      tags
      id
      title
    }
  }
`;

export const CREATE_ARTICLE_MUTATION = `
  mutation createArticle($author:String!, $content:String!, $published:Boolean, $tags:[String], $title:String!) {
    createArticle(data: {author:$author, content:$content, published:$published, tags:$tags, title: $title}) {
      author
      content
      published
      tags
      title
      id
    }
  }
`;

export const UPDATE_ARTICLE_MUTATION = `
  mutation updateArticle($id:String!, $author:String!, $content:String!, $published:Boolean, $tags:[String], $title:String!) {
    updateArticle(id:$id, data:{author:$author, content:$content, published:$published, tags:$tags, title: $title}) {
      id
    }
  }
`;

export const DELETE_ARTICLE_MUTATION = `
  mutation deleteArticle($id:String!) {
    deleteArticle(id:$id) {
      _id
    }
  }
`;
