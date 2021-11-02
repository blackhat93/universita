//creo un nuovo tag personalizzato che si comporta da container per gli altri tag
const Layout = (props) => {
  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Ultimi dieci siti di phishing</h3>
      {props.children}
    </div>
  );
};

export default Layout;
