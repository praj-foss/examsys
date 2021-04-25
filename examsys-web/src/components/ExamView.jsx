const ExamView = ({apiUrl, exam, answers, setAnswers, score, setScore, setMainView}) => {
    function selectOption(secIndex, quesIndex, value) {
        setAnswers(prev => {
            prev.content[secIndex].questions[quesIndex].answer = value;
            return prev;
        });
    }

    function getOptions(ques, quesIndex, secIndex) {
        return ques.options.map((opt, index) => {
            return (
                <div className="option" key={index}>
                    <input type="radio" 
                           name={`${secIndex}-${quesIndex}`} 
                           value={index+1} 
                           onChange={() => selectOption(secIndex, quesIndex, index+1)} /> {opt}
                </div>
            );
        });
    }

    function getQuestions(sec, secIndex) {
        return sec.questions.map((ques, index) => {
            return (
                <div className="exam-question" key={index}>
                    <p>{ques.question}</p>
                    <div className="question-options">
                        {getOptions(ques, index, secIndex)}
                    </div>
                </div>
            );
        });
    }

    function getSections() {
        return exam.content.map((sec, index) => {
            return (
                <div className="exam-section" key={index}>
                    <h4 className="section-heading">{sec.heading}</h4>
                    <div className="exam-questions">
                        {getQuestions(sec, index)}
                    </div>
                </div>
            );
        });
    }

    function submitExam() {
        console.log(answers);

        fetch(apiUrl + "/exams/" + exam.id + "/submit", {
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

    function getScoreAndSubmit() {
        if (score) {
            return (
                <div className="score-view">
                    <h2>Score: {score} </h2>
                    <button onClick={() => setMainView()}>Back</button>
                </div>
            );
        } else {
            return <button onClick={() => submitExam()}>Submit</button>;
        }
    }

    return (
        <div className="exam-view">
            <div className="exam-header">
                <h2>{exam.name}</h2>
                <h2>{exam.duration}</h2>
                {getScoreAndSubmit()}                
            </div>
            <div className="exam-content">
                {getSections()}
            </div>
        </div>
    );
}

export default ExamView;