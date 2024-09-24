import { Anime } from "../models/animeSchema.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCategory(randomInt) {
  if (randomInt == 1) {
    return "waifu";
  } else if (randomInt == 2) {
    return "neko";
  } else if (randomInt == 3) {
    return "trap";
  } else if (randomInt == 4) {
    return "blowjob";
  } else {
    return "Error";
  }
}

const getNSFWImages = async (req, res) => {
  const randomInt = getRandomInt(1, 4);
  const category = getCategory(randomInt);
  const response = await fetch(`https://api.waifu.pics/nsfw/${category}`).then(
    async (response) => await response.json()
  );
  const data = await response.url;
  console.log(data);
  res.send(data);
  const findAnime = await Anime.findOne({ url: data });
  if (!findAnime) {
    const createAnime = await Anime.create({
      url: data,
      type: "NSFW",
    });
    createAnime.save();
    console.log("New Anime added to the db");
  } else {
    console.log("Already exists");
  }
  return data;
};

export { getNSFWImages };
