import { useEffect, useState } from "react";
import update from "immutability-helper";
import ExamList from "../components/list/ExamList";

function ListView({apiUrl, setExamView}) {
    const [examList, setExamList] = useState();
    useEffect(() => {
        fetch(apiUrl + "/exams")
                .then(data => data.json())
                .then(res => setExamList(res))
                .catch(err => console.log(err));
    }, []);

    function startExam(examId) {
        fetch(apiUrl + "/exams/" + examId + "/start")
                .then(data => data.json())
                .then(res => setExamView(res))
                .catch(err => console.log(err));
    }

    function deleteExam(examId, index) {
        fetch(apiUrl + "/exams/" + examId, {
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

    return (
        <main className="exam-list-view">
            <ExamList examList={examList}
                      startExam={startExam}
                      deleteExam={deleteExam} />
        </main>
    );
}

export default ListView;