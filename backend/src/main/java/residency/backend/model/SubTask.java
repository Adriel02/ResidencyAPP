package residency.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "SubTask")
public class SubTask {
    @Id
    private String id;
    private String type;
    private List<String> tasksToDo;

    protected SubTask() {
    }

    public SubTask(String type, List<String> tasks) {
        this.type = type;
        this.tasksToDo = tasks;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getTasksToDo() {
        return tasksToDo;
    }

    public void setTasksToDo(List<String> tasksToDo) {
        this.tasksToDo = tasksToDo;
    }
}
