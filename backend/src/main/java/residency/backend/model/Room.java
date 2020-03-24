package residency.backend.model;

import java.util.Date;

public class Room {
    private String  number;
    private Date lastCleaningDate;


    public Room(String number) {
        this.number = number;
    }

    public Room() {
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public Date getLastCleaningDate() {
        return lastCleaningDate;
    }

    public void setLastCleaningDate(Date lastCleaningDate) {
        this.lastCleaningDate = lastCleaningDate;
    }


}
