package _AD062.project.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Hall {
    @Id
    @GeneratedValue
    Long Id;
    String HallName;
    int Rows;
    int Columns;
    int Capacity;
}