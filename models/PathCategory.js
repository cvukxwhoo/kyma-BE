import { format } from 'date-fns';
import mongoose from 'mongoose';

const PathCategorySchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  byCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    require: true,
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
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
      features: [
        {
          type: String,
        },
      ],
      createdAt: {
        type: String,
        default: format(new Date(), 'MMM dd, yyyy'),
      },
      updatedAt: {
        type: String,
        default: format(new Date(), 'MMM dd, yyyy'),
      },
    },
  ],
  createdAt: {
    type: String,
    default: format(new Date(), 'MMM dd, yyyy'),
  },
  updatedAt: {
    type: String,
    default: format(new Date(), 'MMM dd, yyyy'),
  },
});

const PathCategoryModel = mongoose.model('paths', PathCategorySchema);

export default PathCategoryModel;
