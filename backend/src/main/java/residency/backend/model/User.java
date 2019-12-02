package residency.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "User")
public class User {
    @Id
    private String id;
    private String name;
    private String surname;
    private String dni;
    @DBRef
    private Role role;
    private String username;
    private String password;
    @DBRef
    private TimeSheet timeSheet;

    protected User() {
    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public User(String name, String surname, String dni, Role role, String username, String password, TimeSheet timeSheet) {
        this.name = name;
        this.surname = surname;
        this.dni = dni;
        this.role = role;
        this.username = username;
        this.password = password;
        this.timeSheet = timeSheet;
    }

    public String getId() {
        return id;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
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


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public TimeSheet getTimeSheet() {
        return timeSheet;
    }

    public void setTimeSheet(TimeSheet timeSheet) {
        this.timeSheet = timeSheet;
    }
}
