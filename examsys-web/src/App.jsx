import { useState } from "react";
import MainView from "./components/MainView";
import EditorView from "./components/EditorView";
import ExamView from "./components/ExamView";
import useTimer from "easytimer-react-hook";

function App() {
    const API_URL = "http://praj-aspire:8080";

    const [view, setView] = useState("main");
    const [examList, setExamList] = useState([]);

    const [exam, setExam] = useState();
    const [answers, setAnswers] = useState();
    const [score, setScore] = useState(-1);
    const [timer] = useTimer();

    function setExamView() {
        setView("exam");
    }

    function setMainView() {
        setExam(undefined);
        setAnswers(undefined);
        setScore(-1);
        setView("main");
    }

    function setEditorView() {
        setView("editor");
    }

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

    function startExam(examId) {
        fetch(API_URL + "/exams/" + examId + "/start")
                .then(data => data.json())
                .then(res => initAnswers(res))
                .catch(err => console.log(err))
                .finally(() => setExamView());
    }

    function submitExam() {
        fetch(API_URL + "/exams/" + exam.id + "/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(answers)
        })
            .then(data => data.json())
            .then(res => setScore(res.score))
            .catch(err => console.log(err))
            .finally(() => console.log("Result: " + score));
    }

    function editExam(examId) {
        fetch(API_URL + "/exams/" + examId + "/edit")
            .then(data => data.json())
            .then(res => setExam(res))
            .catch(err => console.log(err))
            .finally(setEditorView);
    }

    return (
        <div className="app">
            <header className="app-header"><h2>Examsys</h2></header>

            { view === "main" && <MainView apiUrl={API_URL} 
                                           examList={examList} 
                                           setExamList={setExamList}
                                           startExam={startExam}
                                           editExam={editExam} /> }

            { view === "exam" && <ExamView exam={exam}
                                           timer={timer}
                                           setAnswers={setAnswers}
                                           score={score}
                                           submitExam={submitExam} 
                                           setMainView={setMainView} /> }

            { view === "editor" && <EditorView apiUrl={API_URL}
                                               exam={exam}
                                               setExam={setExam} /> }
        </div>
    );
}

export default App;
