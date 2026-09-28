package _AD062.project.Controller;

import _AD062.project.Models.Seat;
import _AD062.project.Services.SeatServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seat")
public class SeatControlller {

    @Autowired
    private SeatServices seatServices;

    @GetMapping("/getall")
    ResponseEntity<List<Seat>> getall() {
        return new ResponseEntity<>(seatServices.getallseat(), HttpStatus.OK);
    }

    @PostMapping("/create")
    ResponseEntity<Seat> createseat(@RequestBody Seat body) {
        return new ResponseEntity<>(seatServices.createseat(body), HttpStatus.CREATED);
    }

    @PutMapping("/update")
    ResponseEntity<Seat> updateseat(@RequestBody Seat data) {
        return new ResponseEntity<>(seatServices.updateseat(data), HttpStatus.ACCEPTED);
    }

    @GetMapping("getbyid/{id}")
    ResponseEntity<?> getbyId(@PathVariable long id) {
        try {
            Seat response = seatServices.getbyid(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException exception) {
            return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deletebyid(@PathVariable long id) {
        try {
            seatServices.deletebyid(id);
            return new ResponseEntity<>("Seat deleted successfully", HttpStatus.OK);
        } catch (RuntimeException exception) {
            return new ResponseEntity<>("Seat not found", HttpStatus.NOT_FOUND);
        }
    }
}