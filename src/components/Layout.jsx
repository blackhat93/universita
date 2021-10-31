//come il blocco div (container di Table) è il mio container personalizzato
const Layout = (props) => {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Ultimi dieci siti di phishing</h3>
      {props.children}
    </div>
  );
};

export default Layout;
