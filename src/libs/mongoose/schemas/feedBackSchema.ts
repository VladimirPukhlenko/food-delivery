import { Schema, model, models, Document, Model } from "mongoose";

interface feedBackFields extends Document {
  email: string;
  topic: string;
  description: string;
}

interface feedBackDocument extends feedBackFields, Document {}

interface feedBackModel extends Model<feedBackDocument> {}

const FeedBackSchema = new Schema<feedBackFields>(
  {
    email: String,
    topic: String,
    description: String,
  },
  { timestamps: true }
);

const FeedBack: feedBackModel =
  (models.FeedBack as feedBackModel) ||
  model<feedBackDocument, feedBackModel>("FeedBack", FeedBackSchema);

export default FeedBack;
