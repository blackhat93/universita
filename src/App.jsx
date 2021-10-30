import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";

//itera sugli elementi dell'array in base all'indice
const handleChange = (data, setData, index, language) => {
  let items = [...data];
  let item = items[index];
  item.language = language;
  setData(items);
};

export default function App() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://phishstats.info:2096/api/phishing?_size=10&_sort=-id")
      .then((res) => {
        setRows(res.data);
        return res.data;
      })
      .then((data) =>
        data.forEach((el, index) =>
          axios
            .post(`https://translate.argosopentech.com/detect`, {
              q: `${el.url}`,
              //q: `ciao`,
            })
            .then((res) => {
              handleChange(data, setRows, index, res.data[0].language);
            })
        )
      );
  }, []);
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
