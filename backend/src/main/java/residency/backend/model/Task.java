package residency.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Document(collection = "Task")
public class Task {
    @Id
    private String id;
    private Date creationDate;
    private Date editDate;
    private Date endDate;
    @DBRef
    private SubTask subTask;
    @DBRef
    private User user;
    @DBRef
    private User supervisor;
    private Integer floorNumber;
    private Room room;
    private String incidence;
    private String additionalInformation;
    private String state;
    private List<Boolean> isFinished;
    @DBRef
    private List<Audit> audits;

    protected Task() {
        this.audits = new ArrayList<Audit>();
    }

    public Task(Date creationDate, SubTask subTask, User user, Integer floorNumber, Room room, String additionalInformation, String state, User supervisor) {
        this.creationDate = creationDate;
        this.subTask = subTask;
        this.user = user;
        this.floorNumber = floorNumber;
        this.room = room;
        this.additionalInformation = additionalInformation;
        this.state = state;
        this.supervisor = supervisor;

        this.audits = new ArrayList<Audit>();
    }


    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Date getEditDate() {
        return editDate;
    }

    public void setEditDate(Date editDate) {
        this.editDate = editDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getIncidence() {
        return incidence;
    }

    public void setIncidence(String incidence) {
        this.incidence = incidence;
    }

    public String getAdditionalInformation() {
        return additionalInformation;
    }

    public void setAdditionalInformation(String additionalInformation) {
        this.additionalInformation = additionalInformation;
    }

    public SubTask getSubTask() {
        return subTask;
    }

    public void setSubTask(SubTask subTask) {
        this.subTask = subTask;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }


    public Integer getFloorNumber() {
        return floorNumber;
    }

    public void setFloorNumber(Integer floorNumber) {
        this.floorNumber = floorNumber;
    }

    public List<Boolean> getIsFinished() {
        return isFinished;
    }

    public void setIsFinished(List<Boolean> isFinished) {
        this.isFinished = isFinished;
    }

    public User getSupervisor() {
        return supervisor;
    }

    public void setSupervisor(User supervisor) {
        this.supervisor = supervisor;
    }

    public List<Audit> getAudits() {
        return audits;
    }
}
