import { useEffect } from "react";

const MainView = ({setExamView, apiUrl, examList, setExamList, initAnswers}) => {
    useEffect(() => {
        fetch(apiUrl + "/exams")
                .then(data => data.json())
                .then(res => setExamList(res))
                .catch(err => console.log(err));
    });

    function startExam(examId) {
        fetch(apiUrl + "/exams/" + examId + "/start")
                .then(data => data.json())
                .then(res => initAnswers(res))
                .catch(err => console.log(err))
                .finally(() => setExamView());
    }

    function getRows() {
        return examList.map((es, index) => {
            return (
                <tr key={index}>
                    <td><button onClick={() => startExam(es.id)}>Start</button></td>
                    <td>{es.name}</td>
                    <td>{es.duration}</td>
                    <td>{es.questions}</td>
                    <td><button>Edit</button> <button>Delete</button></td>
                </tr>
            );
        });
    }
    
    return (
        <div className="main-view">
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Exam</th>
                        <th>Duration</th>
                        <th>Questions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {getRows()}
                </tbody>
            </table>
            <div><button>Create</button></div>
        </div>
    );
}

export default MainView;