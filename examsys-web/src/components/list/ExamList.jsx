function ExamList({examList}) {
    function getExamCell(exam) {
        return (
            <td className="cell-exam">
                {exam.name}
                <div className="exam-actions">
                    <button>Start</button>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </td>
        );
    }

    function getRows() {
        return examList.map((item, index) => {
            return (
                <tr key={index} className="list-row">
                    { getExamCell(item, index) }
                    <td>{item.duration}</td>
                    <td>{item.questions}</td>
                </tr>
            );
        });
    }

    return (
        <table className="exam-list">
            <thead>
                <tr>
                    <th class="column-exam">Exam</th>
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