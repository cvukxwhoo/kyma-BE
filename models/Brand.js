import { format } from 'date-fns';
import mongoose from 'mongoose';

const BrandSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      name: String,
      title: String,
      price: Number,
      discountPrice: Number,
      warrantyPeriod: Number,
      origin: String,
      quanities: Number,
      code: String,
      image: String,
      imageUrl: String,
      isActive: Boolean,
      createdAt: String,
      updatedAt: String,
      features: Array,
    },
  ],
  image: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
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

const BrandModel = mongoose.model('brands', BrandSchema);

export default BrandModel;
