package _AD062.project.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Student {
    @Id
    @GeneratedValue
    Long Id;
    String Name;
    String RollNo;
    String Dept;
    String Email;
    String Address;
    int Year;
    int PhNo;
}