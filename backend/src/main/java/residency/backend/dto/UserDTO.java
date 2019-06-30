package residency.backend.dto;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import residency.backend.model.Role;

public class UserDTO {
    @Id
    private String id;
    private String name;
    private String surnames;
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

    public String getSurnames() {
        return surnames;
    }

    public void setSurnames(String surnames) {
        this.surnames = surnames;
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

    public UserDTO(String name, String surnames, Role role, String username) {
        this.name = name;
        this.surnames = surnames;
        this.role = role;
        this.username = username;
    }
}
