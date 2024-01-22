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
  byCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' },
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
