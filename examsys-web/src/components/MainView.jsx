import { useEffect } from "react";

const MainView = ({apiUrl, examList, setExamList, startExam, editExam, createExam, deleteExam}) => {
    useEffect(() => {
        fetch(apiUrl + "/exams")
                .then(data => data.json())
                .then(res => setExamList(res))
                .catch(err => console.log(err));
    }, []);

    function getRows() {
        return examList.map((es, index) => {
            return (
                <tr key={index}>
                    <td><button onClick={() => startExam(es.id)}>Start</button></td>
                    <td>{es.name}</td>
                    <td>{es.duration}</td>
                    <td>{es.questions}</td>
                    <td>
                        <button onClick={() => editExam(es.id)}>Edit</button>
                        <button onClick={() => deleteExam(es.id, index)}>Delete</button>
                    </td>
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
                        <th>Duration (mm:ss)</th>
                        <th>Questions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {getRows()}
                </tbody>
            </table>
            <div><button onClick={createExam}>Create</button></div>
        </div>
    );
}

export default MainView;