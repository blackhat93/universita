import axios from "axios";

//si collega all'end point del server
export const fetchSites = async (setRows, setLoaded) => {
  const sites = await axios.get("/phishstats").then((res) => res.data);
  setRows(sites);
  setLoaded(true);
};

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
