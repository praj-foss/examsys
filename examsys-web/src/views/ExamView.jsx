import { useState, useEffect } from "react";
import useTimer from "easytimer-react-hook";

const ExamView = ({apiUrl, exam, setListView}) => {
    const [timer] = useTimer();
    const [score, setScore] = useState(-1);
    const [submitted, setSubmitted] = useState(false);

    const [answers, setAnswers] = useState({
        id: exam.id,
        content: exam.content.map(sec => {
            return {
                questions: sec.questions.map(() => { return {answer: 0}; })
            };
        })
    });

    useEffect(() => {
        timer.addEventListener("targetAchieved", submitExam);
        const [mm, ss] = exam.duration.split(":");
        timer.start({
            countdown: true, 
            startValues: [0, parseInt(ss), parseInt(mm), 0, 0]
        });
    }, []);

    function submitExam() {
        setSubmitted(true);

        if (timer.isRunning()) 
            timer.pause();

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
                           disabled={submitted}
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

    function getScoreAndSubmit() {
        if (score !== -1) {
            return (
                <div className="score-view hbox">
                    <h2>Score: {score} </h2>
                    <button className="button-md" onClick={setListView}>Back</button>
                </div>
            );
        } else {
            return <button className="button-md" onClick={submitExam} disabled={submitted}>Submit</button>;
        }
    }

    return (
        <main className="exam-view">
            <div className="exam-header">
                <div className="hbox space-between">
                    <h2>{exam.name}</h2>
                    <h2>{timer.getTimeValues().toString().slice(3)}</h2>
                    {getScoreAndSubmit()}
                </div>
                <div className="header-gradient"></div>                                
            </div>
            <div className="exam-content">
                {getSections()}
            </div>
        </main>
    );
}

export default ExamView;