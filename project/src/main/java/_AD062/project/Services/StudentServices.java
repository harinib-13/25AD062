package _AD062.project.Services;

import _AD062.project.Models.Student;
import _AD062.project.Repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServices {

    @Autowired
    private StudentRepository studentRepository;

    public List<Student> getallstudent() {
        return studentRepository.findAll();
    }

    public Student createstudent(Student data) {
        return studentRepository.save(data);
    }

    public Student updatestudent(Student data) {
        return studentRepository.save(data);
    }

    public Student getbyid(long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public void deletebyid(long id) {
        Student data = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        studentRepository.delete(data);
    }
}