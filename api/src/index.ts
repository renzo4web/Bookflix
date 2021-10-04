import app from "./app";
import './database'

const PORT = app.get('port');
module.exports = app.listen(PORT, () => console.log(`Server on port ${PORT}`));

