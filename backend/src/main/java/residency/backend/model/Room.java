package residency.backend.model;

import java.util.Date;

public class Room {
    private Integer number;
    private Date lastCleaningDate;


    public Room(Integer number) {
        this.number = number;
    }

    public Room() {
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Date getLastCleaningDate() {
        return lastCleaningDate;
    }

    public void setLastCleaningDate(Date lastCleaningDate) {
        this.lastCleaningDate = lastCleaningDate;
    }


}
