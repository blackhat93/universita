import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import SiteTable from "./components/SiteTable";
import { fetchLanguages, fetchSites } from "./utils/fetchUtils";

export default function App() {
  /*viene usata la funzione useState() di React come "ancora"(hanno introdotto le ancore che permettono 
  di usare tutte le funzionalita della classe Component di react nelle funzioni) tramite gli hook 
  ritorna una coppia data dal valore dello stato corrente ed una funzione che permette di aggiornarlo.*/
  const [rows, setRows] = useState([]);
  const [loaded, setLoaded] = useState(false);

  /*useEffect prende due argomenti una call back (che è la funzione anonima) e un array di dipendenze.
aggiunge la possibilità di eseguire effetti collaterali da componenti funzione 
e quindi di aggiornare la mia tabella*/
  useEffect(() => {
    fetchSites(setRows, setLoaded);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchLanguages(rows, setRows, loaded);
    // eslint-disable-next-line
  }, [loaded]);
  //ritorna un componente Layout definito nel file Layout.jsx
  return (
    <Layout>
      <SiteTable rows={rows} />
    </Layout>
  );
}
