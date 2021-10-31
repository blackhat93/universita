import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import SiteTable from "./components/SiteTable";
import { fetchLanguages, fetchSites } from "./utils/fetchUtils";

//useState è un hook di react (ancora)
export default function App() {
  const [rows, setRows] = useState([]);
  const [loaded, setLoaded] = useState(false);
  //useEffect prende due argomenti una call back (che è la funzione anonima) e un array di dipendenze
  //è il nuovo modo di gestire il componente che qui è App.hanno introdotto le ancore che permettono di usare tutte le funzionalita della classe Component di react nelle funzioni
  useEffect(() => {
    fetchSites(setRows, setLoaded);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    fetchLanguages(rows, setRows, loaded);
    // eslint-disable-next-line
  }, [loaded]);
  return (
    <Layout>
      <SiteTable rows={rows} />
    </Layout>
  );
}
