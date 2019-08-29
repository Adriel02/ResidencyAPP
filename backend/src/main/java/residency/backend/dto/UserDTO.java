package residency.backend.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import residency.backend.model.Role;

public class UserDTO {
    @Id
    private String id;
    private String name;
    private String surname;
    @DBRef
    private Role role;
    private String username;

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

    public UserDTO(String name, String surname, Role role, String username) {
        this.name = name;
        this.surname = surname;
        this.role = role;
        this.username = username;
    }
}
