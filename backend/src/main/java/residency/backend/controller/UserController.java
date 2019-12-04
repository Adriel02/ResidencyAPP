package residency.backend.controller;

import org.springframework.web.bind.annotation.*;
import residency.backend.model.User;
import residency.backend.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return this.userService.getAllUser();
    }


    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable("role") String role) {
        return this.userService.getAllUserByRole(role);
    }

    @GetMapping("/timeSheet/{timeSheet}")
    public List<User> getUsersByTimeSheet(@PathVariable("timeSheet")String timeSheet){
        return this.userService.getAllUserByTimeSheet(timeSheet);
    }

    /**
     *
     * HAY QUE MIRAR COMO PASAR 2 PARAMETROS Y PODER DEVOLVER RESULTADOS
     */
    @GetMapping("/{role}/{timeSheet}")
    public List<User> getUsersByTimeSheet(@PathVariable String role, @PathVariable String timeSheet){
        return this.userService.getAllUserByRoleAndTimeSheet(role,timeSheet);
    }

    @PostMapping
    public void createUser(@RequestBody User user) {
        this.userService.createUser(user);
    }

    @PutMapping
    public void updateUser(@RequestBody User user) {
        this.userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") String id) {
        this.userService.deleteUser(id);
    }
}
