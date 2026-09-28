package _AD062.project.Controller;

import _AD062.project.Models.ExamSession;
import _AD062.project.Services.ExamSessionServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/examsession")
public class ExamSessionController {

    @Autowired
    private ExamSessionServices examSessionServices;

    @GetMapping("/getall")
    ResponseEntity<List<ExamSession>> getall() {
        return new ResponseEntity<>(examSessionServices.getallexamsession(), HttpStatus.OK);
    }

    @PostMapping("/create")
    ResponseEntity<ExamSession> createexamsession(@RequestBody ExamSession body) {
        return new ResponseEntity<>(examSessionServices.createexamsession(body), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    ResponseEntity<ExamSession> updateexamsession(@RequestBody ExamSession data) {
        return new ResponseEntity<>(examSessionServices.updateexamsession(data), HttpStatus.ACCEPTED);
    }

    @GetMapping("/getbyid/{id}")
    ResponseEntity<?> getbyId(@PathVariable long id) {
        try {
            ExamSession response = examSessionServices.getbyid(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException exception) {
            return new ResponseEntity<>("Exam Session not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deletebyid(@PathVariable long id) {
        try {
            examSessionServices.deletebyid(id);
            return new ResponseEntity<>("Exam Session deleted successfully", HttpStatus.OK);
        } catch (RuntimeException exception) {
            return new ResponseEntity<>("Exam Session not found", HttpStatus.NOT_FOUND);
        }
    }
}