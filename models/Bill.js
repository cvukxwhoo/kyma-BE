import { format } from 'date-fns';
import mongoose from 'mongoose';

const BillSchema = mongoose.Schema({
  formData: { type: Object, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: { type: Number, required: true },
    },
  ],
});

const BillModel = mongoose.model('bills', BillSchema);

export default BillModel;
