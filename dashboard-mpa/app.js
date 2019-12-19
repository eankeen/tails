import express from 'express'
import hbs from 'hbs'
import helmet from 'helmet'

import { initCleanup } from './core/cleanup'
import { initEnv } from './core/env'
import routes from './routes'

initCleanup()
initEnv()

const app = express()
app.enable('case sensitive routing')
app.set('json spaces', 2)
app.disable('strict routing')
app.set('views', 'views')
app.set('view engine', 'hbs')
app.disable('x-powered-by')
app.engine('hbs', hbs.__express)
hbs.registerPartials('views/partials')
hbs.registerPartials('views/components')
hbs.registerPartials('views/forms')
hbs.localsAsTemplateData(app)

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.on('listening', () => console.log('server restarted'))
app.listen(3010)