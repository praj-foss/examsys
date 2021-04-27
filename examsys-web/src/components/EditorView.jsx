import { useState } from "react";
import update from "immutability-helper";

const EditorView = ({apiUrl, exam, setExam}) => {
    function template() {
        return {
            heading: "Heading",
            questions: [{
                question: "Question",
                options: ["1", "2", "3", "4"],
                answer: 1
            }]
        };
    }

    const [examInfo, setExamInfo] = useState({
        name: exam.name,
        mm: exam.duration.split(":")[0],
        ss: exam.duration.split(":")[1]
    });

    function setExamName(e) {
        setExamInfo(info => update(info, 
            {name: {$set: e.target.value}}));
    }
    function setMinutes(e) {
        setExamInfo(info => update(info, 
            {mm: {$set: e.target.value}}));
    }
    function setSeconds(e) {
        setExamInfo(info => update(info, 
            {ss: {$set: e.target.value}}));
    }

    function getOption(secIndex, quesIndex, optIndex) {
        return exam.content[secIndex].questions[quesIndex].options[optIndex];
    }
    function setOption(secIndex, quesIndex, optIndex, value) {
        setExam(ex => update(ex, 
            {content: {[secIndex]: {questions: {[quesIndex]: {options: {[optIndex]: {$set: value}}}}}}}));
    }

    function getAnswer(secIndex, quesIndex) {
        return exam.content[secIndex].questions[quesIndex].answer;
    }
    function setAnswer(secIndex, quesIndex, value) {
        setExam(ex => update(ex,
            {content: {[secIndex]: {questions: {[quesIndex]: {answer: {$set: value}}}}}}));
    }
    function isAnswer(secIndex, quesIndex, optIndex) {
        return getAnswer(secIndex, quesIndex) === optIndex + 1;
    }

    function onRadioChange(secIndex, quesIndex, e) {
        if (e.target.checked) {
            setAnswer(secIndex, quesIndex, parseInt(e.target.value));
        }
    }

    function getOptions(ques, quesIndex, secIndex) {
        return ques.options.map((opt, index) => {
            return (
                <div className="option" key={index}>
                    <input type="radio" 
                           name={`${secIndex}-${quesIndex}`} 
                           value={index + 1}
                           checked={isAnswer(secIndex, quesIndex, index)}
                           onChange={e => onRadioChange(secIndex, quesIndex, e)} />
                    <input type="text"
                           placeholder="Option"
                           value={getOption(secIndex, quesIndex, index)}
                           onChange={e => setOption(secIndex, quesIndex, index, e.target.value)} />
                </div>
            );
        });
    }

    function getQuestion(secIndex, quesIndex) {
        return exam.content[secIndex].questions[quesIndex].question;
    }
    function setQuestion(secIndex, quesIndex, value) {
        setExam(ex => update(ex, 
            {content: {[secIndex]: {questions: {[quesIndex]: {question: {$set: value}}}}}}));
    }

    function newQuestion(secIndex) {
        const tmp = template().questions[0];
        setExam(ex => update(ex, 
            {content: {[secIndex]: {questions: {$push: [tmp]}}}}));
    }

    function getQuestions(sec, secIndex) {
        const questionList = sec.questions.map((ques, index) => {
            return (
                <div className="exam-question" key={index}>
                    <textarea cols="50" 
                              rows="4" 
                              value={getQuestion(secIndex, index)}
                              onChange={e => setQuestion(secIndex, index, e.target.value)}>
                    </textarea>
                    <div className="question-options">
                        {getOptions(ques, index, secIndex)}
                    </div>
                </div>
            );
        });

        return (
            <div className="exam-questions">
                {questionList}
                <button onClick={() => newQuestion(secIndex)}>New Question</button>
            </div>
        );
    }

    function newSection() {
        setExam(ex => update(ex, 
            {content: {$push: [template()]}}));
    }

    function getSections() {
        const contentList = exam.content.map((sec, index) => {
            return (
                <div className="exam-section" key={index}>
                    <h4 className="section-heading">{sec.heading}</h4>
                    {getQuestions(sec, index)}
                </div>
            );
        });

        return (
            <div className="editor-content">
                {contentList}
                <button onClick={newSection}>New Section</button>
            </div>
        );
    }

    return (
        <div className="editor-view">
            <div className="exam-header hbox space-between">
                <div className="hbox">
                    <h3>Exam: </h3>
                    <input type="text" name="exam" placeholder="Title" value={examInfo.name} onChange={setExamName}/>
                </div>
                <div className="hbox">
                    <h3>Duration: </h3>
                    <input type="number" name="exam" min="1" max="59" placeholder="mm" value={examInfo.mm} onChange={setMinutes}/>
                    <input type="number" name="exam" min="0" max="59" placeholder="ss" value={examInfo.ss} onChange={setSeconds}/>
                </div>
                <div className="hbox">
                    <button>Save</button>
                    <button>Discard</button>
                </div>
            </div>
            {getSections()}
        </div>
    );
}

export default EditorView;