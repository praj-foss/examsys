package in.praj.examsys;

import in.praj.examsys.bean.Exam;
import in.praj.examsys.bean.ExamOpResult;
import io.micronaut.http.annotation.*;

import javax.inject.Inject;

@Controller("/exams")
public class ExamController {
    @Inject
    private ExamRepo examRepo;

    @Get("{examId}")
    public ExamOpResult getExam(@PathVariable String examId) {
        return examRepo.findExam(examId);
    }

    @Post
    public ExamOpResult postExam(@Body Exam exam) {
        return examRepo.insertExam(exam);
    }
}
