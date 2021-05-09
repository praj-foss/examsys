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

    function saveEditedExam() {
        let url = API_URL + "/exams";
        let method = "POST";
        
        if (exam.id) {
            url += "/" + exam.id;
            method = "PUT";
        }
        
        fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(exam)
        })
            .catch(err => console.log(err))
            .finally(setListView);
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

            { view === "editor" && <EditorView exam={exam}
                                               setExam={setExam}
                                               setMainView={setListView}
                                               saveEditedExam={saveEditedExam} /> }
        </div>
    );
}

export default App;
