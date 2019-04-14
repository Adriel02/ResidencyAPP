package residency.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import residency.backend.dao.ResidencyRepository;
import residency.backend.model.Residency;

import java.util.List;
import java.util.Optional;


@Service
public class ResidencyService {

    private ResidencyRepository residencyRepository;

    @Autowired
    public ResidencyService(ResidencyRepository residencyRepository) {
        this.residencyRepository = residencyRepository;
    }

    public Optional<Residency> getResidencyById(String id){
        return this.residencyRepository.findById(id);
    }

    public List<Residency> getAllResidency() {
        return this.residencyRepository.findAll();
    }
}
