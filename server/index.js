const express = require("express");
const app = express();
const { exec } = require("child_process");
const axios = require("axios");
const { error } = require("console");

app.use(express.json());

app.get("/phishstats", async (req, res) => {
  try {
    const data = await axios
      .get("https://phishstats.info:2096/api/phishing?_size=10&_sort=-id")
      .then((res) => res.data);
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Errore caricamento risorse",
      error,
    });
  }
});

//rida il linguaggio del contenuto
app.post("/phishingSiteLang", async (req, res) => {
  const url = req.body.url;
  try {
    const site = await axios.get(url).then((response) => response.data);
    const lang = await axios
      .post(`https://translate.argosopentech.com/detect`, {
        q: `${site}`,
      })
      .then((res) => res.data[0].language);
    res.status(200).send(lang);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.use(express.static("build"));

app.listen(4000, () => {
  console.log("OK");
});
