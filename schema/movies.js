const graphql = require("graphql");
const Directors = require("../models/director");
const Movies = require("../models/movie");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    genre: {
      type: new GraphQLNonNull(GraphQLString),
    },
    director: {
      type: DirectorType,
      resolve(parent) {
        return Directors.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: "Directors",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    age: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent) {
        return Movies.find({ directorId: parent.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
      },
      resolve(_, args) {
        const newMovie = new Movies({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        });
        return newMovie.save();
      },
    },
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(_, args) {
        const newDirector = new Directors({
          name: args.name,
          age: args.age,
        });
        return newDirector.save();
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
      },
      resolve(_, args) {
        const { id, name, genre, directorId } = args;
        return Movies.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              genre,
              directorId,
            },
          },
          { new: true }
        );
      },
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(_, args) {
        const { id, name, age } = args;
        return Directors.findByIdAndUpdate(
          id,
          {
            $set: {
              name,
              age,
            },
          },
          { new: true }
        );
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, args) {
        return Directors.findByIdAndDelete(args.id);
      },
    },
    deleteMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(_, args) {
        return Movies.findByIdAndDelete(args.id);
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    movie: {
      type: MovieType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(_, args) {
        return Movies.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      resolve(_, args) {
        return Directors.findById(args.id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movies.find({});
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve() {
        return Directors.find({});
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
