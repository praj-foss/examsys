package in.praj.examsys.bean;

import io.micronaut.core.annotation.Introspected;

import javax.annotation.concurrent.Immutable;

@Introspected
@Immutable
public class ExamOpResult {
    private final Boolean success;
    private final ExamSummary summary;

    public ExamOpResult(Boolean success, ExamSummary exam) {
        this.success = success;
        this.summary = exam;
    }

    public Boolean getSuccess() {
        return success;
    }

    public ExamSummary getSummary() {
        return summary;
    }
}
