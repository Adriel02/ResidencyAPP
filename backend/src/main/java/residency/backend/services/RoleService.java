package residency.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import residency.backend.dao.RoleRepository;
import residency.backend.model.Role;

import java.util.List;


@Service
public class RoleService {

    private RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return this.roleRepository.findAll();
    }

    public void deleteRole(String id) {
        this.roleRepository.deleteById(id);
    }

    public Role createRol(Role role) {
        if (roleIsValid(role)) {
            return this.roleRepository.insert(role);
        }
        return null;
    }

    public void updateRol(Role role){
        this.roleRepository.save(role);
    }

    private boolean roleIsValid(Role role) {
        return role.getTypeRole() != null;
    }

}
