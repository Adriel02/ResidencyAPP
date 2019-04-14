package residency.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import residency.backend.model.Residency;
import residency.backend.services.ResidencyService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/residency")
public class ResidencyController {
    private ResidencyService residencyService;

    @Autowired
    public ResidencyController(ResidencyService residencyService) {
        this.residencyService = residencyService;
    }

    @GetMapping
    public List<Residency> getAllResidency(){
        return this.residencyService.getAllResidency();
    }
    @GetMapping("/{id}")
    public Optional<Residency> getResidencyById(@PathVariable String id){
        return this.residencyService.getResidencyById(id);
    }
}
