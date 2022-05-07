import Loading from "./customComponent/Loading";
import LoaderHelper from "./customComponent/Loading/LoaderHelper";
import "./App.css";
import Routing from "./Routing";

function App() {
  return (
    <>
      <Loading ref={(ref) => LoaderHelper.setLoader(ref)} />
      <Routing />
    </>
  );
}

export default App;
