package residency.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import residency.backend.model.SubTask;
import residency.backend.services.SubTaskService;

import java.util.List;

@RestController
@RequestMapping("/subtask")
public class SubTaskController {
    private SubTaskService subTaskService;

    @Autowired
    public SubTaskController(SubTaskService subTaskService) {
        this.subTaskService = subTaskService;
    }

    @GetMapping
    public List<SubTask> getAllSubTasks(){
        return this.subTaskService.getAllSubTasks();
    }

}
