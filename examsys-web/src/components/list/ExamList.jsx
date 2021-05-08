function ExamList({examList, startExam, deleteExam}) {
    function onDeleteExam(exam, index) {
        if (window.confirm(`Delete exam '${exam.name}'?`)) {
            deleteExam(exam.id, index);
        }
    }

    function getExamCell(exam, index) {
        return (
            <td className="cell-exam">
                {exam.name}
                <div className="exam-actions">
                    <button onClick={() => startExam(exam.id)}>Start</button>
                    <button>Edit</button>
                    <button onClick={() => onDeleteExam(exam, index)}>Delete</button>
                </div>
            </td>
        );
    }

    function getRows() {
        if (examList)
            return examList.map((item, index) => {
                return (
                    <tr key={index} className="list-row">
                        { getExamCell(item, index) }
                        <td>{item.duration}</td>
                        <td>{item.questions}</td>
                    </tr>
                );
            });
        else
            return <tr><td>Loading ...</td></tr>;
    }

    return (
        <table className="exam-list">
            <thead>
                <tr>
                    <th className="column-exam">Exam</th>
                    <th>Duration</th>
                    <th>Questions</th>
                </tr>
            </thead>
            <tbody>
                { getRows() }
            </tbody>
            <tfoot>
                <tr>
                    <td><button>Create</button></td>
                </tr>
            </tfoot>
        </table>
    );
}

export default ExamList;