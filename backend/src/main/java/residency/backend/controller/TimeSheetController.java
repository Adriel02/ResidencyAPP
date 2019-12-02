package residency.backend.controller;

import org.springframework.web.bind.annotation.*;
import residency.backend.model.TimeSheet;
import residency.backend.services.TimeSheetService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/timeSheet")
@CrossOrigin
public class TimeSheetController {
    private TimeSheetService timeSheetService;

    public TimeSheetController(TimeSheetService timeSheetService) {
        this.timeSheetService = timeSheetService;
    }

    @GetMapping
    public List<TimeSheet> getAllTimeSheets(){
        return this.timeSheetService.findAllTimeSheets();
    }

    @GetMapping("/{id}")
    public Optional<TimeSheet> findByID(@PathVariable("id") String id){
        return this.timeSheetService.findByID(id);
    }
}
