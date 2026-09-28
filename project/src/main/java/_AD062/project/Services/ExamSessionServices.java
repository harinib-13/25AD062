package _AD062.project.Services;

import _AD062.project.Models.ExamSession;
import _AD062.project.Repository.ExamSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExamSessionServices {

    @Autowired
    private ExamSessionRepository examSessionRepository;

    public List<ExamSession> getallexamsession() {
        return examSessionRepository.findAll();
    }

    public ExamSession createexamsession(ExamSession data) {
        return examSessionRepository.save(data);
    }

    public ExamSession updateexamsession(ExamSession data) {
        return examSessionRepository.save(data);
    }

    public ExamSession getbyid(long id) {
        return examSessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam Session not found"));
    }

    public void deletebyid(long id) {
        ExamSession data = examSessionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam Session not found"));

        examSessionRepository.delete(data);
    }
}