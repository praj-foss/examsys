import { useState } from "react";
import MainView from "./components/MainView";
import EditorView from "./components/EditorView";
import ExamView from "./components/ExamView";

function App() {
    const API_URL = "http://praj-aspire:8080";

    const [view, setView] = useState("main");
    const [examList, setExamList] = useState([]);

    const [exam, setExam] = useState();
    const [answers, setAnswers] = useState();
    const [score, setScore] = useState();

    function initAnswers(ex) {
        setAnswers({
            id: ex.id,
            content: ex.content.map(sec => {
                return {
                    questions: sec.questions.map(q => { return {answer: 0}; })
                };
            })
        });
        setExam(ex);
    }

    function setExamView() {
        setView("exam");
    }

    function setMainView() {
        setExam(undefined);
        setAnswers(undefined);
        setScore(undefined);
        setView("main");
    }

    return (
        <div className="app">
            <header className="app-header"><h2>Examsys</h2></header>

            { view === "main" && <MainView setExamView={setExamView} 
                                           apiUrl={API_URL} 
                                           examList={examList} 
                                           setExamList={setExamList}
                                           initAnswers={initAnswers} /> }

            { view === "exam" && <ExamView apiUrl={API_URL}
                                           exam={exam}
                                           answers={answers}
                                           setAnswers={setAnswers}
                                           score={score}
                                           setScore={setScore} 
                                           setMainView={setMainView} /> }

            { view === "editor" && <EditorView apiUrl={API_URL} /> }
        </div>
    );
}

export default App;
