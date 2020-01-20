package residency.backend.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import residency.backend.exception.TaskNotValidException;
import residency.backend.model.Audit;
import residency.backend.model.Task;
import residency.backend.services.TaskService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/task")
@CrossOrigin
public class TaskController {
    private TaskService taskService;
    private SimpMessagingTemplate template;

    @Autowired
    public TaskController(SimpMessagingTemplate template,TaskService taskService) {

        this.taskService = taskService;
        this.template=template;
    }

    @GetMapping
    public List<Task> getAll() {
        return this.taskService.getAllTask();
    }

    @GetMapping("/{user}")
    public List<Task> getAllTaskByUser(@PathVariable("user") String user) {
        return this.taskService.getTaskUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable("id") String id) {
        this.taskService.deleteTask(id);
        template.convertAndSend("/ws/remove", id);
    }


    @PostMapping
    public void createTask(@RequestBody Task task) throws Exception {
        Task newtask = this.taskService.createTask(task);
        if (newtask == null) {
            throw new TaskNotValidException();
        }

        template.convertAndSend("/ws/add", newtask);
    }

    @PutMapping
    public void updateTask(@RequestParam String task) throws TaskNotValidException, IOException {
        Task newTask = this.taskService.updateTask(task);
        if (newTask == null) {
            throw new TaskNotValidException();
        }
        template.convertAndSend("/ws/update", newTask);
    }

}
