import mongoose from "mongoose"
import mongoosePaginate from 'mongoose-paginate-v2'
const { Schema, model } = mongoose;
const MockedSchema = new Schema({
  title: { type: String, required: true },
  description:{type:String},
  code:{type:String},
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  category: { type: Schema.Types.ObjectId, ref: 'Category' },
  thumbnail:{type:String},
  visible: { type: Boolean, default: true},
});
MockedSchema.plugin(mongoosePaginate)

const MockedProduct = model('MockProduct', MockedSchema);

export default MockedProduct;