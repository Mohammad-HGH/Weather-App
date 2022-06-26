import { Fragment } from "react";
import Home from "./components/page/Home";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <Fragment>
      <div className="site-content">
        <Home />
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
