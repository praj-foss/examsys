package in.praj.examsys;

import in.praj.examsys.bean.Exam;
import in.praj.examsys.bean.ExamOpResult;
import in.praj.examsys.bean.ExamSummary;
import io.micronaut.http.annotation.*;

import javax.inject.Inject;
import java.util.List;
import java.util.stream.Collectors;

@Controller("/exams")
public class ExamController {
    @Inject
    private ExamRepo examRepo;

    @Get
    public List<ExamSummary> getSummaries() {
        return examRepo.findAll()
                .stream()
                .map(ExamSummary::new)
                .collect(Collectors.toList());
    }

    @Get("{examId}")
    public ExamSummary getSummary(@PathVariable String examId) {
        return examRepo.findExam(examId)
                .map(ExamSummary::new)
                .orElse(null);
    }

    @Post
    public ExamOpResult postExam(@Body Exam exam) {
        return (examRepo.insertExam(exam))
                ? new ExamOpResult(true, new ExamSummary(exam))
                : new ExamOpResult(false, null);
    }

    @Put("{examId}")
    public ExamOpResult putExam(@PathVariable String examId, @Body Exam exam) {
        return (examRepo.replaceExam(examId, exam))
                ? new ExamOpResult(true, new ExamSummary(exam))
                : new ExamOpResult(false, null);
    }

    @Delete("{examId}")
    public ExamOpResult deleteExam(@PathVariable String examId) {
        return (examRepo.deleteExam(examId))
                ? new ExamOpResult(true, null)
                : new ExamOpResult(false, null);
    }
}
