const mongoose = require('mongoose')
require('dotenv').config({ path: "variables.env" })

const connection = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      },
      () => {
        console.log('DB connected')
      }
    )   

  } catch (err) {
    console.error(err)
    process.exit(1) 
  }
}

module.exports = connection
