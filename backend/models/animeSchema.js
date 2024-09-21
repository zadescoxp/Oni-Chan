import mongoose from "mongoose";

const animeSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      unique: true,
    },
    rating: {
      type: Number,
      required: false,
      unique: false,
      default: 0,
    },
    type: {
      type: String,
      required: true,
      unique: false,
    },
  },
  { timestamps: true }
);

const Anime = mongoose.model("anime", animeSchema);

export { Anime };
