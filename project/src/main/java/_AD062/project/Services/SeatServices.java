
package _AD062.project.Services;

import _AD062.project.Models.Seat;
import _AD062.project.Repository.SeatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatServices {

    @Autowired
    private SeatRepository seatRespository;

    public List<Seat> getallseat() {
        return seatRespository.findAll();
    }

    public Seat createseat(Seat data) {
        return seatRespository.save(data);
    }

    public Seat updateseat(Seat data) {
        return seatRespository.save(data);
    }

    public Seat getbyid(long id) {
        return seatRespository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat not found"));
    }

    public void deletebyid(long id) {
        Seat data = seatRespository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        seatRespository.delete(data);
    }
}