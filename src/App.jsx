import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

//si collega all'end point del server
const fetchSites = async (setRows, setLoaded) => {
  const sites = await axios.get("/phishstats").then((res) => res.data);
  setRows(sites);
  setLoaded(true);
};

const fetchLanguages = async (sites, setter) => {
  console.log("FETCH::::", sites);
  for (const site of sites) {
    try {
      const siteLang = await axios
        .post("/phishingSiteLang", { url: site.url })
        .then((res) => res.data);
      let items = [...sites];
      let item = items[site];
      item.language = siteLang;
      setter(items);
    } catch (error) {
      site.language = "ERR";
      console.log(error);
    }
  }
};

export default function App() {
  const [rows, setRows] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchSites(setRows, setLoaded);
    fetchLanguages(rows, setRows);
  }, []);
  console.log("ROWS::::", rows);

  return rows.length > 0 ? (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ maxWidth: 10 }}>date</TableCell>
            <TableCell sx={{ maxWidth: 10 }}>url</TableCell>
            <TableCell sx={{ maxWidth: 10 }}>domain</TableCell>
            <TableCell sx={{ maxWidth: 10 }}>ip</TableCell>
            <TableCell sx={{ maxWidth: 10 }}>countrycode</TableCell>
            <TableCell sx={{ maxWidth: 10 }}>city</TableCell>
            <TableCell sx={{ maxWidth: 10 }}>score</TableCell>
            <TableCell sx={{ maxWidth: 10 }}>language</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell>{row.url}</TableCell>
              <TableCell>{row.domain}</TableCell>
              <TableCell>{row.ip}</TableCell>
              <TableCell>{row.countrycode}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell>{row.language ? row.language : "checking"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <div>Caricamento</div>
  );
}
