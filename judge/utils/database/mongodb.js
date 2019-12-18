const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://debanjan_01:deb12345@firstcluster-yy6sf.mongodb.net/computeaid?retryWrites=true&w=majority')
module.exports = {
  mongoose
}
