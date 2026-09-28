package _AD062.project.Controller;

import _AD062.project.Models.Hall;
import _AD062.project.Services.HallServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hall")
public class HallController {

    @Autowired
    private HallServices hallServices;

    @GetMapping("/getall")
    ResponseEntity<List<Hall>> getall() {
        return new ResponseEntity<>(hallServices.getallhall(), HttpStatus.OK);
    }

    @PutMapping("/update")
    ResponseEntity<Hall> updatehall(@RequestBody Hall data) {
        return new ResponseEntity<>(hallServices.updatehall(data), HttpStatus.ACCEPTED);
    }

    @GetMapping("getbyid/{id}")
    ResponseEntity<?> getbyId(@PathVariable long id) {
        try {
            Hall response = hallServices.getbyid(id);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException exception) {
            return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/create")
    ResponseEntity<Hall> createhall(@RequestBody Hall body) {
        return new ResponseEntity<>(hallServices.createhall(body), HttpStatus.CREATED);
    }

    @GetMapping
    String getbyIdParam(@RequestParam long i) {
        return "hall with id " + i;
    }

    @DeleteMapping("/delete/{id}")
    ResponseEntity<?> deletebyid(@PathVariable long id) {
        try {
            hallServices.deletebyid(id);
            return new ResponseEntity<>("Hall deleted successfully", HttpStatus.OK);
        } catch (RuntimeException exception) {
            return new ResponseEntity<>("Hall not found", HttpStatus.NOT_FOUND);
        }
    }
}