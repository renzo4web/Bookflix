import app from "./app";
import './database'

const PORT = app.get('port');


if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

module.exports = app;


