import { format } from 'date-fns';
import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true, // Fix the typo from "require" to "required"
    unique: true,
  },
  title: {
    type: String,
    required: true, // Fix the typo from "require" to "required"
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  pathIds: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paths',
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

const CategoryModel = mongoose.model('categories', CategorySchema);

export default CategoryModel;
