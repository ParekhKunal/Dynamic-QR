const dbConn = require('./db/index.js')
const app = require('./app.js')


dbConn.query('SELECT 1').then(() => {
    console.log('DB Connected Successfully')
    app.listen(process.env.PORT, () => {
        console.log(`App is listening on Port ${process.env.PORT}`)
    })
}).catch((err) => {
    console.log(`DB Connected Successfully ${err}`)
})


