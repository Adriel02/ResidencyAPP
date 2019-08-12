package residency.backend.model;

import java.util.List;

public class Floor {
    private Integer numberFloor;
    private List<Room> rooms;


    public Floor() {
    }

    public Floor(Integer numberFloor, List<Room> rooms) {
        this.numberFloor = numberFloor;
        this.rooms = rooms;
    }


    public Integer getNumberFloor() {
        return numberFloor;
    }

    public void setNumberFloor(Integer numberFloor) {
        this.numberFloor = numberFloor;
    }

    public List<Room> getRooms() {
        return rooms;
    }

    public void setRooms(List<Room> rooms) {
        this.rooms = rooms;
    }

}
