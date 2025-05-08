import mongoose, { Types } from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: {
    type: Types.ObjectId,
  },
  amountOfItemsInCart: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
