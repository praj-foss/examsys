import { useState } from "react";
import Header from "./components/Header";
import EditorView from "./views/EditorView";
import ExamView from "./views/ExamView";
import useTimer from "easytimer-react-hook";
import ListView from "./views/ListView";

function App() {
    const API_URL = process.env.REACT_APP_ORIGIN;

    const [view, setView] = useState("list");
    const [exam, setExam] = useState();
    const [answers, setAnswers] = useState();
    const [score, setScore] = useState(-1);
    const [timer] = useTimer();

    function setMainView() {
        setView("list");
        setExam(undefined);
        setAnswers(undefined);
        setScore(-1);
    }

    function setExamView(ex) {
        setAnswers({
            id: ex.id,
            content: ex.content.map(sec => {
                return {
                    questions: sec.questions.map(() => { return {answer: 0}; })
                };
            })
        });
        setExam(ex);
        setView("exam");
    }

    function setEditorView(ex) {
        setExam(ex);
        setView("editor");
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
            <Header />

            { view === "list" && <ListView apiUrl={API_URL}
                                           setExamView={setExamView}
                                           setEditorView={setEditorView} /> }

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
