import axios from "axios";

/*si collega al primo end-point del server tramite chiamata axios,recupera i dati della chiamata GET a 
phishstats.info e li salva nella variabile sites*/
export const fetchSites = async (setRows, setLoaded) => {
  const sites = await axios.get("/phishstats").then((res) => res.data);
  setRows(sites);
  setLoaded(true);
};

/*si collega al secondo end-point del server per fargli eseguire una chiamata POST per ogni sito 
iterando sugli elementi della variabile sites che contiene gli url */
export const fetchLanguages = async (sites, setter, loaded) => {
  if (loaded) {
    for (let i = 0; i < sites.length; i++) {
      try {
        const siteLang = await axios
          .post("/phishingSiteLang", { url: sites[i].url })
          .then((res) => res.data);
        const newSites = [...sites];
        newSites[i].language = siteLang;
        setter(newSites);
      } catch (error) {
        const newSites = [...sites];
        newSites[i].language = "ERRORE";

        setter(newSites);
        console.error(error);
      }
    }
  }
};
