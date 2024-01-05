const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/movies");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 3005;

app.use(cors());
app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

mongoose
  .connect(
    `mongodb+srv://voit:1234567890@cluster0.zbkdbet.mongodb.net/moviesDB?retryWrites=true&w=majority`
  )
  .then(() =>
    app.listen(port, () =>
      console.log(`server started on port and db connected :${port}`)
    )
  )
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
