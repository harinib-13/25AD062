package _AD062.project.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Seat {
    @Id
    @GeneratedValue
    Long Id;
    String SeatNumber;
    int SeatRow;
    int SeatColumn;
    Long HallId;
}