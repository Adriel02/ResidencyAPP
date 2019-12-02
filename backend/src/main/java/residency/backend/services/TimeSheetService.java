package residency.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import residency.backend.dao.TimeSheetRepository;
import residency.backend.model.TimeSheet;

import java.util.List;
import java.util.Optional;

@Service
public class TimeSheetService {

    public TimeSheetRepository timeSheetRepository;

    @Autowired
    public TimeSheetService(TimeSheetRepository timeSheetRepository) {
        this.timeSheetRepository = timeSheetRepository;
    }

    public List<TimeSheet> findAllTimeSheets (){
        return this.timeSheetRepository.findAll();
    }

    public Optional<TimeSheet> findByID(String id){
        return this.timeSheetRepository.findById(id);
    }
}
