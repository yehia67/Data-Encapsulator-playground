const { port, serverUrl } = require('./config');
const { app } = require('./app');

app.listen(port, () => console.log(`server is up on ${serverUrl} on port: ${port}`))
