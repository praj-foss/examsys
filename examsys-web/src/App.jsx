import { useState } from "react";
import MainView from "./components/MainView";
import EditorView from "./components/EditorView";
import ExamView from "./components/ExamView";
import useTimer from "easytimer-react-hook";
import update from "immutability-helper";

function App() {
    const API_URL = process.env.REACT_APP_ORIGIN;

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
        setView("main");
        setExam(undefined);
        setAnswers(undefined);
        setScore(-1);
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
            .catch(err => console.log(err));
    }

    function editExam(examId) {
        fetch(API_URL + "/exams/" + examId + "/edit")
            .then(data => data.json())
            .then(res => setExam(res))
            .catch(err => console.log(err))
            .finally(setEditorView);
    }

    function createExam() {
        setExam({
            name: "Untitled",
            duration: "1:00",
            content: []
        })
        setEditorView();
    }

    function deleteExam(examId, index) {
        fetch(API_URL + "/exams/" + examId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .catch(err => console.log(err))
            .finally(() => {
                setExamList(el => update(el, {$splice: [[index, 1]]}));
            });
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
            .finally(setMainView);
    }

    return (
        <div className="app">
            <header className="app-header"><h2>Examsys</h2></header>

            { view === "main" && <MainView apiUrl={API_URL} 
                                           examList={examList} 
                                           setExamList={setExamList}
                                           startExam={startExam}
                                           editExam={editExam}
                                           createExam={createExam}
                                           deleteExam={deleteExam} /> }

            { view === "exam" && <ExamView exam={exam}
                                           timer={timer}
                                           setAnswers={setAnswers}
                                           score={score}
                                           submitExam={submitExam} 
                                           setMainView={setMainView} /> }

            { view === "editor" && <EditorView exam={exam}
                                               setExam={setExam}
                                               setMainView={setMainView}
                                               saveEditedExam={saveEditedExam} /> }
        </div>
    );
}

export default App;
