import { format } from 'date-fns';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  discountPrice: {
    type: Number,
    require: false,
  },
  warrantyPeriod: {
    type: Number,
    require: false,
  },
  origin: {
    type: String,
    require: false,
  },
  quanities: {
    type: Number,
    require: true,
  },
  brands: { type: mongoose.Schema.Types.ObjectId, ref: 'brands' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
  path: { type: mongoose.Schema.Types.ObjectId, ref: 'paths' },
  code: {
    type: String,
    require: true,
    unique: true,
  },
  image: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
  },
  isActive: {
    type: Boolean,
    require: false,
  },
  features: {
    type: [],
    require: false,
  },
  createdAt: {
    type: String,
    default: format(new Date(), 'MMM dd, yyyy'),
  },
  updatedAt: {
    type: String,
    default: format(new Date(), 'MMM dd, yyyy'),
  },
});

const ProductModel = mongoose.model('products', ProductSchema);

export default ProductModel;
