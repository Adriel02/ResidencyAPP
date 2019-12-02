package residency.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "TimeSheet")
public class TimeSheet {
    @Id
    private String id;
    private String name;
    private String startTime;
    private String endsTime;

    protected TimeSheet(){
    }

    public TimeSheet(String name, String startTime, String endsTime){
        this.name=name;
        this.startTime = startTime;
        this.endsTime = endsTime;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndsTime() {
        return endsTime;
    }

    public void setEndsTime(String endsTime) {
        this.endsTime = endsTime;
    }
}
