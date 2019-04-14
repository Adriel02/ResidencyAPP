package residency.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import residency.backend.exception.TaskNotValidException;
import residency.backend.model.Task;
import residency.backend.services.TaskService;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    private TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public List<Task> getAll(){
        return this.taskService.getAllTask();
    }

    @GetMapping("/{user}")
    public List<Task> getAllTaskByUser(@PathVariable("user") String user){
        return this.taskService.getTaskUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") String id){
        this.taskService.deleteTask(id);
    }

    @PostMapping
    public void createTask(@RequestBody Task task) throws Exception {
        Task newtask = this.taskService.createTask(task);
        if(newtask == null){
            throw new TaskNotValidException();
        }
    }

    @PutMapping
    public void updateTask(@RequestBody Task task){
        this.taskService.updateTask(task);
    }


}
