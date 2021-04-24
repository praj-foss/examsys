package in.praj.examsys;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Filters;
import in.praj.examsys.bean.Exam;
import io.micronaut.context.annotation.Context;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Context
public class ExamRepo {
    private static final String MONGO_DB   = "MONGO_DB";
    private static final String MONGO_COLL = "exams";

    @Inject
    private MongoClient client;
    private MongoCollection<Exam> exams;

    public boolean insertExam(Exam exam) {
        exam.setId(NanoIdUtils.randomNanoId());
        return exams.insertOne(exam).wasAcknowledged();
    }

    public Optional<Exam> findExam(String examId) {
        return Optional.ofNullable(exams.find(Filters.eq("_id", examId)).first());
    }

    public List<Exam> findAll() {
        return exams.find().into(new ArrayList<>());
    }

    @PostConstruct
    private void init() {
        exams = client.getDatabase(System.getenv(MONGO_DB))
                .getCollection(MONGO_COLL, Exam.class);
    }
}
