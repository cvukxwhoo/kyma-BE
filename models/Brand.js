import { format } from 'date-fns';
import mongoose from 'mongoose';

const BrandSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  title: {
    type: String,
    require: true,
  },
  products: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
      },
      name: String,
      title: String,
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

const BrandModel = mongoose.model('brands', BrandSchema);

export default BrandModel;
