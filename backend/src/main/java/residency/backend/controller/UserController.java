package residency.backend.controller;

import org.springframework.web.bind.annotation.*;
import residency.backend.model.User;
import residency.backend.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return this.userService.getAllUser();
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable("username") String username){
        return this.userService.getUserByUserName(username);
    }

    @GetMapping("/role/{role}")
    public List<User> getUsersByRole(@PathVariable("role") String role){
        return this.userService.getAllUserByRole(role);
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
    public void deleteUser(@PathVariable("id") String id){
        this.userService.deleteUser(id);
    }
}
