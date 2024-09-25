import express from "express";
import { getSFWImages } from "./controllers/sfw.js";
import mongoose from "mongoose";
import cors from "cors";
import { Anime } from "./models/animeSchema.js";
import { getNSFWImages } from "./controllers/nsfw.js";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log("Database connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running ...`);
    });
  })
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/api/sfw", getSFWImages);
app.get("/vote/sfw", async (req, res) => {
  Anime.aggregate([{ $match: { type: "SFW" } }, { $sample: { size: 1 } }])
    .then((result) => {
      // Output the random anime document
      res.json({
        id: result[0]._id,
        url: result[0].url,
        rating: result[0].rating,
      });
    })
    .catch((err) => {
      console.error(err); // Handle errors
    });
});
app.get("/vote/sfw/:id", async (req, res) => {
  const { id } = req.params;
  const findAnime = await Anime.findOne({ _id: id });
  if (findAnime) {
    findAnime.rating = findAnime.rating + 1;
    findAnime.save();
    console.log("She is hot 🥵");
    res.send("");
  } else {
    console.log(err);
  }
});

app.get("/top/sfw", async (req, res) => {
  try {
    const mostRatedAnime = await Anime.find({ type: "SFW" })
      .sort({ rating: -1 })
      .limit(25)
      .exec();

    if (mostRatedAnime) {
      res
        .status(200)
        .json({ message: "Most rated anime found!", anime: mostRatedAnime });
    } else {
      res.status(404).json({ message: "No anime found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});

app.get("/api/nsfw", getNSFWImages);
app.get("/vote/nsfw", async (req, res) => {
  Anime.aggregate([{ $match: { type: "NSFW" } }, { $sample: { size: 1 } }])
    .then((result) => {
      // Output the random anime document
      res.json({
        id: result[0]._id,
        url: result[0].url,
        rating: result[0].rating,
      });
    })
    .catch((err) => {
      console.error(err); // Handle errors
    });
});
app.get("/vote/nsfw/:id", async (req, res) => {
  const { id } = req.params;
  const findAnime = await Anime.findOne({ _id: id });
  if (findAnime) {
    findAnime.rating = findAnime.rating + 1;
    findAnime.save();
    console.log("She is hot 🥵");
    res.send("");
  } else {
    console.log(err);
  }
});

app.get("/top/nsfw", async (req, res) => {
  try {
    const mostRatedAnime = await Anime.find({ type: "NSFW" })
      .sort({ rating: -1 })
      .limit(25)
      .exec();

    if (mostRatedAnime) {
      res
        .status(200)
        .json({ message: "Most rated anime found!", anime: mostRatedAnime });
    } else {
      res.status(404).json({ message: "No anime found!" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});
