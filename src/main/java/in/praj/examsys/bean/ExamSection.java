package in.praj.examsys.bean;

import java.util.List;

public class ExamSection {
    private String heading;
    private List<ExamQuestion> questions;

    public String getHeading() {
        return heading;
    }

    public List<ExamQuestion> getQuestions() {
        return questions;
    }

    public void setHeading(String heading) {
        this.heading = heading;
    }

    public void setQuestions(List<ExamQuestion> questions) {
        this.questions = questions;
    }
}
