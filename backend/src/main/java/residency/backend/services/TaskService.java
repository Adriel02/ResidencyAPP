package residency.backend.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import residency.backend.dao.AuditRepository;
import residency.backend.dao.TaskRepository;
import residency.backend.model.Audit;
import residency.backend.model.Task;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Service
public class TaskService {
    private TaskRepository taskRepository;
    private AuditRepository auditRepository;

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
            addIsFinished(task);
//            Audit audit = new Audit("State","",task.getState(),new Date());
//            audit.setId(java.util.UUID.randomUUID().toString());
//            auditRepository.save(audit);
//            task.getAudits().add(audit);
            this.taskRepository.insert(task);
            return task;
        }
        return null;
    }



    public Task updateTask(String StringTask) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        Task task = mapper.readValue(StringTask, Task.class);
        if (isValidtask(task)) {
            if(task.getIsFinished()==null){
                addIsFinished(task);
            }
//            Audit lastAudit = task.getAudits().get(task.getAudits().size()-1);
//            Audit audit = new Audit("State",lastAudit.getCurrentValue(),task.getState(),new Date());
//            auditRepository.save(audit);
//            //Añadir la Audit a BBDD
//            task.getAudits().add(audit);
            this.taskRepository.save(task);
            return task;
        }
        return null;
    }

    private boolean isValidtask(Task task) {
        return  task.getCreationDate() != null &&
                task.getState() != null &&
                task.getSupervisor() != null;
    }
    private void addIsFinished(Task task) {
        List<Boolean > isFinished = new ArrayList<>();
        for(String taskToDo : task.getSubTask().getTasksToDo()){
            isFinished.add(false);
        }
        task.setIsFinished(isFinished);
    }

    public void addAuditToTask(String id, Audit audit) {

        Task task = taskRepository.findById(id).orElse(null);

//        task.getAudits().add(audit);

        taskRepository.save(task);

    }
}
