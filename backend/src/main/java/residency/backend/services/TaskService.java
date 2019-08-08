package residency.backend.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import residency.backend.dao.TaskRepository;
import residency.backend.model.Task;

import java.util.List;


@Service
public class TaskService {
    private TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> getAllTask() {
        return this.taskRepository.findAll();
    }

    public List<Task> getTaskUser(String user) {
        return this.taskRepository.findAllByUserId(user);
    }

    public void deleteTask(String id) {
        this.taskRepository.deleteById(id);
    }

    public Task createTask(Task task) {
        if (isValidtask(task)) {
            this.taskRepository.insert(task);
            return task;
        }
        return null;
    }

    public Task updateTask(Task task) {
        if (isValidtask(task)) {
            this.taskRepository.save(task);
            return task;
        }
        return null;
    }

    private boolean isValidtask(Task task) {
        return task.getUser() != null && task.getCreationDate() != null &&
                task.getState() != null;
    }
}
