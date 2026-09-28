package _AD062.project.Services;

import _AD062.project.Models.Hall;
import _AD062.project.Repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HallServices {

    @Autowired
    private HallRepository hallRespository;

    public List<Hall> getallhall() {
        return hallRespository.findAll();
    }

    public Hall createhall(Hall data) {
        return hallRespository.save(data);
    }

    public Hall updatehall(Hall data) {
        return hallRespository.save(data);
    }

    public Hall getbyid(long id) {
        return hallRespository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hall not found"));
    }

    public void deletebyid(long id) {
        Hall data = hallRespository.findById(id)
                .orElseThrow(() -> new RuntimeException("Hall not found"));

        hallRespository.delete(data);
    }
}