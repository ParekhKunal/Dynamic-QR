const dbConn = require('./db/index.js')
const app = require('./app.js')


try {
    dbConn.query('SELECT 1').then(() => {
        app.listen(process.env.PORT, () => {
            console.log('DB Connected Successfully')
            console.log(`App is listening on Port ${process.env.PORT}`)
        })
    }).catch((err) => {
        console.log(`DB Connected Successfully ${err}`)
    })
} catch (error) {
    console.log(error)
}


