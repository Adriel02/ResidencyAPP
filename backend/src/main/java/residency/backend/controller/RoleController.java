package residency.backend.controller;


import org.springframework.web.bind.annotation.*;
import residency.backend.model.Role;
import residency.backend.services.RoleService;

import java.util.List;

@RestController
@RequestMapping("/role")
@CrossOrigin
public class RoleController {
    private RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<Role> getAll() {
        return this.roleService.getAllRoles();
    }

    @DeleteMapping("/{id}")
    public void deleteRole(@PathVariable("id") String id) {
        this.roleService.deleteRole(id);
    }

    @PostMapping
    public void createRole(@RequestBody Role role) {
        this.roleService.createRol(role);
    }

    @PutMapping
    public void updateRol(@RequestBody Role role) {
        this.roleService.updateRol(role);
    }
}
