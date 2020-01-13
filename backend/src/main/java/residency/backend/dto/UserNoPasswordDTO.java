package residency.backend.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import residency.backend.model.Role;
import residency.backend.model.TimeSheet;

public class UserNoPasswordDTO {

    //Se crea para poder ver los datos en el apartado Profile
    @Id
    private String id;
    private String name;
    private String surname;
    private String dni;
    @DBRef
    private Role role;
    private String username;

    public UserNoPasswordDTO(String name, String surname, String dni, Role role, String username, TimeSheet timeSheet) {
        this.name = name;
        this.surname = surname;
        this.dni = dni;
        this.role = role;
        this.username = username;
        this.timeSheet = timeSheet;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public TimeSheet getTimeSheet() {
        return timeSheet;
    }

    public void setTimeSheet(TimeSheet timeSheet) {
        this.timeSheet = timeSheet;
    }

    @DBRef
    private TimeSheet timeSheet;
}
