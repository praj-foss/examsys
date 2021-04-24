package in.praj.examsys.bean;

import io.micronaut.core.annotation.Introspected;

import javax.annotation.concurrent.Immutable;

@Introspected
@Immutable
public class ExamScore {
    private final String id;
    private final Integer score;

    public ExamScore(String id, Integer score) {
        this.id = id;
        this.score = score;
    }

    public String getId() {
        return id;
    }

    public Integer getScore() {
        return score;
    }
}
