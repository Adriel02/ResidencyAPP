package residency.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import residency.backend.dao.SubTaskRepository;
import residency.backend.model.SubTask;

import java.util.List;


@Service
public class SubTaskService {
    private SubTaskRepository subTaskRepository;

    @Autowired
    public SubTaskService(SubTaskRepository subTaskRepository) {
        this.subTaskRepository = subTaskRepository;
    }


    public List<SubTask> getAllSubTasks(){
        return this.subTaskRepository.findAll();
    }

}
