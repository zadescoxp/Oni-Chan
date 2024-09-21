const fetchSFWImages = () => {
  const res = fetch("http://localhost:8000/api/sfw");
  return res;
};

async function getSFWImages() {
  const res = await fetch("http://localhost:8000/vote/sfw");
  console.log(res.json());
  return res.json();
}

export { fetchSFWImages, getSFWImages };
