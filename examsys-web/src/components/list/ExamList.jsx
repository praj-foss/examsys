import { useState } from "react";

function ExamList({examList}) {
    const [hoveredRow, setHoveredRow] = useState(-1);

    function getExamCell(exam, rowIndex) {
        return (
            <td className="cell-exam">
                {exam.name}
                <div className={`exam-actions ${hoveredRow === rowIndex ? "" : "hidden"}`}>
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
                <tr key={index}
                    className="list-row"
                    onMouseEnter={() => setHoveredRow(index)} 
                    onMouseLeave={() => {if (hoveredRow === index) setHoveredRow(-1);}}>

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
        </table>
    );
}

export default ExamList;