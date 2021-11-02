const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

//alloca nella variabile data il risultato della chiamata GET fatta da axios, oppure restituisce un errore
app.get("/phishstats", async (req, res) => {
  try {
    const data = await axios
      .get("https://phishstats.info:2096/api/phishing?_size=10&_sort=-id")
      .then((res) => res.data);
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({
      message: "Errore caricamento risorse",
      error,
    });
  }
});

//funzione creata per restituire il linguaggio del contenuto dei siti di phishing, effettua una POST a translate
//per ogni sito di phishing dato da phishingstats.info, oppure restituisce l'errore creato

app.post("/phishingSiteLang", async (req, res) => {
  const url = req.body.url;
  try {
    //effettua per ogni sito una get ai vari url di phishing e li passa al parametro q per ottenere la lingua
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

//quando il server riceve una richiesta sul root in automatico mi va a prendere l'index.html nella cartella build
app.use(express.static("build"));

app.listen(4000, () => {
  console.log("OK");
});
