import { useState } from "react";
import MainView from "./components/MainView";
import EditorView from "./components/EditorView";

function App() {
    const API_URL = "http://praj-aspire:8080";

    const [view, setView] = useState("main");
    const [examList, setExamList] = useState([]);

    return (
        <div className="app">
            <header className="app-header"><h2>Examsys</h2></header>
            { view === "main" && <MainView apiUrl={API_URL} examList={examList} setExamList={setExamList} /> }
            { view === "editor" && <EditorView apiUrl={API_URL} /> }
        </div>
    );
}

export default App;
