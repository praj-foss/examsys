package in.praj.examsys.bean;

import io.micronaut.core.annotation.Introspected;
import javax.annotation.concurrent.Immutable;

@Introspected
@Immutable
public class ExamOpResult {
    private final Boolean success;
    private final Exam exam;

    public ExamOpResult(Boolean success, Exam exam) {
        this.success = success;
        this.exam = exam;
    }

    public Boolean getSuccess() {
        return success;
    }

    public Exam getExam() {
        return exam;
    }
}
