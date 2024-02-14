import { format } from 'date-fns';
import mongoose from 'mongoose';

const BillSchema = mongoose.Schema({
  formData: { type: Object },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: String },
      quanities: { type: Number },
      price: { type: Number },
      title: { type: String },
    },
  ],
});

const BillModel = mongoose.model('bills', BillSchema);

export default BillModel;
