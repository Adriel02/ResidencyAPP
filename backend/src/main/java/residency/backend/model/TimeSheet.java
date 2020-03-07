package residency.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "TimeSheet")
public class TimeSheet {
    @Id
    private String id;
    private String name;
    private String startTime;
    private String endsTime;
    private List<Date> workDays;

    protected TimeSheet(){
    }

    public TimeSheet(String name, String startTime, String endsTime, List<Date> workDays){
        this.name=name;
        this.startTime = startTime;
        this.endsTime = endsTime;
        this.workDays = workDays;
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

    public List<Date> getWorkDays() {
        return workDays;
    }

    public void setWorkDays(List<Date> workDays) {
        this.workDays = workDays;
    }
}
