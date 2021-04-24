package in.praj.examsys.bean;

import io.micronaut.core.annotation.Introspected;
import java.util.List;

@Introspected
public class Exam {
    private String id;
    private String name;
    private String duration;
    private List<ExamSection> content;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public List<ExamSection> getContent() {
        return content;
    }

    public void setContent(List<ExamSection> content) {
        this.content = content;
    }
}
