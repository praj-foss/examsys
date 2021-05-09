import { useEffect, useState } from "react";
import update from "immutability-helper";

const EditorView = ({exam, setExam, setMainView, saveEditedExam}) => {
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
    function deleteQuestion(secIndex, quesIndex) {
        setExam(ex => update(ex, 
            {content: {[secIndex]: {questions: {$splice: [[quesIndex, 1]]}}}}));
    }

    function getQuestions(sec, secIndex) {
        const questionList = sec.questions.map((ques, index) => {
            return (
                <div className="exam-question" key={index}>
                    <button onClick={() => deleteQuestion(secIndex, index)}>Delete Question</button><br/>
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

    function getHeading(secIndex) {
        return exam.content[secIndex].heading;
    }
    function setHeading(secIndex, value) {
        setExam(ex => update(ex, 
            {content: {[secIndex]: {heading: {$set: value}}}}));
    }

    function newSection() {
        setExam(ex => update(ex, 
            {content: {$push: [template()]}}));
    }
    function deleteSection(secIndex) {
        setExam(ex => update(ex,
            {content: {$splice: [[secIndex, 1]]}}));
    }

    function getSections() {
        const contentList = exam.content.map((sec, index) => {
            return (
                <div className="exam-section" key={index}>
                    <h4 className="section-heading">Section: </h4>
                    <input type="text"
                           value={getHeading(index)}
                           onChange={e => setHeading(index, e.target.value)}/>
                    <button onClick={() => deleteSection(index)}>Delete Section</button>
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

    const [duration, setDuration] = useState({mm: 1, ss: 0});
    useEffect(() => {
        const [m, s] = exam.duration.split(":");
        setDuration(dur => update(dur, {
            mm: {$set: m},
            ss: {$set: s}
        }));
    }, []);

    function setExamName(e) {
        setExam(ex => update(ex, {name: {$set: e.target.value}}));
    }

    function setMinutes(e) {
        setDuration(dur => update(dur, 
            {mm: {$set: e.target.value}}));
    }
    function setSeconds(e) {
        setDuration(dur => update(dur, 
            {ss: {$set: e.target.value}}));
    }

    function onSave() {
        const dur = `${duration.mm}:${duration.ss}`;
        setExam(ex => update(ex, {duration: {$set: dur}}));
        saveEditedExam();
    }

    return (
        <div className="editor-view">
            <div className="exam-header hbox space-between">
                <div className="hbox">
                    <h3>Exam: </h3>
                    <input type="text" name="exam" placeholder="Title" value={exam.name} onChange={setExamName}/>
                </div>
                <div className="hbox">
                    <h3>Duration: </h3>
                    <input type="number" name="exam" min="1" max="59" placeholder="mm" value={duration.mm} onChange={setMinutes}/>
                    <input type="number" name="exam" min="0" max="59" placeholder="ss" value={duration.ss} onChange={setSeconds}/>
                </div>
                <div className="hbox">
                    <button onClick={onSave}>Save</button>
                    <button onClick={setMainView}>Discard</button>
                </div>
            </div>
            {getSections()}
        </div>
    );
}

export default EditorView;