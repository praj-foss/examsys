import { useState } from "react";
import Header from "./components/Header";
import EditorView from "./views/EditorView";
import ExamView from "./views/ExamView";
import ListView from "./views/ListView";

function App() {
    const API_URL = process.env.REACT_APP_ORIGIN;
    const [view, setView] = useState("list");
    const [exam, setExam] = useState();

    function setListView() {
        setView("list");
        setExam(undefined);
    }

    function setExamView(ex) {
        setExam(ex);
        setView("exam");
    }

    function setEditorView(ex) {
        setExam(ex);
        setView("editor");
    }
    
    return (
        <div className="app">
            <Header />

            { view === "list" && <ListView apiUrl={API_URL}
                                           setExamView={setExamView}
                                           setEditorView={setEditorView} /> }

            { view === "exam" && <ExamView apiUrl={API_URL}
                                           exam={exam}
                                           setListView={setListView} /> }

            { view === "editor" && <EditorView apiUrl={API_URL}
                                               exam={exam}
                                               setExam={setExam}
                                               setListView={setListView} /> }
        </div>
    );
}

export default App;
