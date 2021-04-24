package in.praj.examsys.bean;

import io.micronaut.core.annotation.Introspected;

import javax.annotation.concurrent.Immutable;

@Introspected
@Immutable
public class ExamSummary {
    private final String id;
    private final String name;
    private final String duration;
    private final Integer questions;

    public ExamSummary(Exam exam) {
        this.id = exam.getId();
        this.name = exam.getName();
        this.duration = exam.getDuration();
        this.questions = exam.getContent()
                .stream()
                .mapToInt(s -> s.getQuestions().size())
                .sum();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDuration() {
        return duration;
    }

    public Integer getQuestions() {
        return questions;
    }
}
