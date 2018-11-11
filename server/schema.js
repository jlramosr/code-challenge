import {
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} from 'graphql';
import db from './db';

const articleType = new GraphQLObjectType({
  name: 'Article',
  description: 'This represents a Article',
  fields: () => ({
    author: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    excerpt: {
      type: GraphQLString,
    },
    id: {
      type: GraphQLString,
    },
    published: {
      type: GraphQLBoolean,
    },
    tags: {
      type: new GraphQLList(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
  }),
});

const articleInputType = new GraphQLInputObjectType({
  name: 'ArticleInput',
  fields: {
    author: { type: new GraphQLNonNull(GraphQLString) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    published: { type: GraphQLBoolean, defaultValue: false },
    tags: { type: new GraphQLList(GraphQLString), defaultValue: [] },
    title: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const articleOutputType = new GraphQLObjectType({
  name: 'ArticleOutput',
  fields: {
    _id: { type: GraphQLString },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => ({
    articles: {
      type: new GraphQLList(articleType),
      resolve() {
        return db.Article.find();
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createArticle: {
      type: articleType,
      args: {
        data: {
          type: articleInputType,
        },
      },
      resolve(obj, { data }) {
        return db.Article.create(data);
      },
    },
    updateArticle: {
      type: articleType,
      args: {
        id: {
          type: GraphQLString,
        },
        data: {
          type: articleInputType,
        },
      },
      resolve(obj, { id, data }) {
        return db.Article.update({ _id: id }, data);
      },
    },
    deleteArticle: {
      type: articleOutputType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve(obj, { id }) {
        return db.Article.findOneAndRemove({ _id: id });
      },
    },
  }),
});

const Schema = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});

export default Schema;
