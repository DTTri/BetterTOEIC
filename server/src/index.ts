import express, { Express, json } from 'express'
import dotenv from 'dotenv'

const app: Express = express()
const PORT: number = 8000

dotenv.config() //configure env enviroment to use data from .env
app.use(json())
app.use(express.json()) //all express muse be convert to json

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
