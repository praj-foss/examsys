package in.praj.examsys;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import in.praj.examsys.bean.Exam;
import in.praj.examsys.bean.ExamOpResult;
import io.micronaut.context.annotation.Context;

import javax.annotation.PostConstruct;
import javax.inject.Inject;

@Context
public class ExamRepo {
    private static final String MONGO_DB   = "MONGO_DB";
    private static final String MONGO_COLL = "exams";

    @Inject
    private MongoClient client;
    private MongoCollection<Exam> exams;

    public ExamOpResult insertExam(Exam exam) {
        exam.setId(NanoIdUtils.randomNanoId());
        if (exams.insertOne(exam).wasAcknowledged()) {
            return new ExamOpResult(true, exam);
        } else {
            exam.setId(null);
            return new ExamOpResult(false, null);
        }
    }

    public ExamOpResult findExam(String examId) {
        var found = exams.find(Filters.eq("_id", examId)).first();
        return new ExamOpResult(found != null, found);
    }

    @PostConstruct
    private void init() {
        exams = client.getDatabase(System.getenv(MONGO_DB))
                .getCollection(MONGO_COLL, Exam.class);
    }
}
