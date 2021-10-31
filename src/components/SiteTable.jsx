import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

//styled è l'API di material che mi permette di fa css sui componenti di mui
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const SiteTable = (props) => {
  //specifica le proprieta da tirare fuori dall'oggetto props
  const { rows } = props;
  return rows.length > 0 ? (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>date</StyledTableCell>
            <StyledTableCell>url</StyledTableCell>
            <StyledTableCell>domain</StyledTableCell>
            <StyledTableCell>ip</StyledTableCell>
            <StyledTableCell>countrycode</StyledTableCell>
            <StyledTableCell>city</StyledTableCell>
            <StyledTableCell>score</StyledTableCell>
            <StyledTableCell>language</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <StyledTableCell component="th" scope="row">
                {row.date}
              </StyledTableCell>
              <StyledTableCell>{row.url}</StyledTableCell>
              <StyledTableCell>{row.domain}</StyledTableCell>
              <StyledTableCell>{row.ip}</StyledTableCell>
              <StyledTableCell>{row.countrycode}</StyledTableCell>
              <StyledTableCell>{row.city}</StyledTableCell>
              <StyledTableCell>{row.score}</StyledTableCell>
              <StyledTableCell>
                {row.language ? row.language : "checking"}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <CircularProgress />
  );
};

export default SiteTable;
