const config = {
    dbUrl : process.env.DB_URL || "mongodb+srv://admin:1234@cluster0.j1juz.gcp.mongodb.net/ups?retryWrites=true&w=majority",
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'http://localhost',
    publicRoute: process.env.PUBLIC_ROUTE || '/',
    filesRoute: process.env.FILES_ROUTE || 'files'

}

module.exports = config