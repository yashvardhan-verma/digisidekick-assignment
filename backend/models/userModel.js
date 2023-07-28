const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const userSchema = new Schema({
  name: {
    type: Object,
    required: true
  },
  jwtToken: [],
  email: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  country_Code: {
    type: String,
    default: "91"
  },
  age: {
    type: Number,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
  createdDate: { type: Date, default: Date.now }
});
userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("user", userSchema);