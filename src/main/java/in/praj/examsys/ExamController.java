package in.praj.examsys;

import in.praj.examsys.bean.*;
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

    @Get("{examId}/start")
    public Exam startExam(@PathVariable String examId) {
        return examRepo.findExam(examId)
                .map(exam -> {
                    exam.getContent().forEach(s -> {
                        s.getQuestions().forEach(q -> q.setAnswer(null));
                    });
                    return exam;
                }).orElse(null);
    }

    @Get("{examId}/submit")
    public ExamScore submitExam(@PathVariable String examId, @Body Exam submitted) {
        return examRepo.findExam(examId)
                .map(exam -> {
                    var subIter  = submitted.getContent().iterator();
                    var examIter = exam.getContent().iterator();
                    var score = 0;

                    while (subIter.hasNext() && examIter.hasNext()) {
                        score += getSectionScore(subIter.next(), examIter.next());
                    }

                    return new ExamScore(exam.getId(), score);
                }).orElse(null);
    }

    private int getSectionScore(ExamSection submitted, ExamSection correct) {
        var subIter = submitted.getQuestions().iterator();
        var corIter = correct.getQuestions().iterator();
        var score = 0;

        while (subIter.hasNext() && corIter.hasNext()) {
            if (subIter.next().getAnswer().equals(corIter.next().getAnswer()))
                score++;
        }
        return score;
    }
}
