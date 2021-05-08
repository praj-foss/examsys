import { useEffect, useState } from "react";
import ExamList from "../components/list/ExamList";

function ListView({apiUrl}) {
    const [examList, setExamList] = useState([]);
    useEffect(() => {
        fetch(apiUrl + "/exams")
                .then(data => data.json())
                .then(res => setExamList(res))
                .catch(err => console.log(err));
    }, []);

    return (
        <main className="exam-list-view">
            <ExamList examList={examList} />
        </main>
    );
}

export default ListView;