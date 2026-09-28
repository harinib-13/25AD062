package _AD062.project.Controller;

import _AD062.project.Models.Student;
import _AD062.project.Services.StudentServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentServices studentServices;

    @GetMapping("/getall")
    ResponseEntity<List<Student>> getall() {
        return new ResponseEntity<>(studentServices.getallstudent(), HttpStatus.OK);
    }

    @PostMapping("/create")
    ResponseEntity<Student> createstudent(@RequestBody Student body) {
        return new ResponseEntity<>(studentServices.createstudent(body), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    ResponseEntity<Student> updatestudent(@RequestBody Student data) {
        return new ResponseEntity<>(studentServices.updatestudent(data), HttpStatus.ACCEPTED);
    }

    @GetMapping("/getbyid/{id}")
    ResponseEntity<?> getbyId(@PathVariable long id) {
        try {
            Student response = studentServices.getbyid(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException exception) {
            return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deletebyid(@PathVariable long id) {
        try {
            studentServices.deletebyid(id);
            return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK);
        } catch (RuntimeException exception) {
            return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
        }
    }
}