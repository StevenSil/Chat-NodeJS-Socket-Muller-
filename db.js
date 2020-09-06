const db = require('mongoose')

db.Promise = global.Promise

async function connect(uri) { 
    await db.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'ups'
    })
    .then(() => console.log('[db] Conexión exitosa'))
    .catch(error => console.error('[db] Conexión fallida', error))
}

module.exports = connect