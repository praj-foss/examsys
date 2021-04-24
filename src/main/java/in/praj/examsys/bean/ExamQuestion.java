package in.praj.examsys.bean;

import java.util.List;

public class ExamQuestion {
    private String question;
    private List<String> options;
    private Integer answer;

    public String getQuestion() {
        return question;
    }

    public List<String> getOptions() {
        return options;
    }

    public Integer getAnswer() {
        return answer;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public void setAnswer(Integer answer) {
        this.answer = answer;
    }
}
