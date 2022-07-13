import './App.css';
import Header from "../common/components/header";
import Content from "./components/content";
import {useEffect} from "react";

function App() {


  return (
      <div className={'page'}>
        <Header />
        <Content />
      </div>
  );
}

export default App;
