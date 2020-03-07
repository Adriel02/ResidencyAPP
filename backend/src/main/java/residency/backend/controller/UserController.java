package residency.backend.controller;

import org.springframework.web.bind.annotation.*;
import residency.backend.dto.GeneralUserDTO;
import residency.backend.exception.UserNotValidException;
import residency.backend.model.User;
import residency.backend.services.UserService;

import java.util.Date;
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
    public List<User> getUsersByTimeSheet(@PathVariable("timeSheet") String timeSheet) {
        return this.userService.getAllUserByTimeSheet(timeSheet);
    }

    @GetMapping("/{role}/{timeSheet}/{date}")
    public List<User> getAllUserByRoleAndTimeSheet(@PathVariable String role, @PathVariable String timeSheet, @PathVariable Date date ) {
        return this.userService.getAllUserByRoleAndTimeSheet(role, timeSheet,date);
    }

    @GetMapping("/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        return this.userService.getUserByUsername(username);
    }

    @GetMapping("/name/{name}")
    public User getUserByName(@PathVariable String name) {
        return this.userService.getUserByName(name);
    }

    @PostMapping
    public void createUser(@RequestBody User user) {
        this.userService.createUser(user);
    }

    @PutMapping
    public void updateUser(@RequestBody User user) throws UserNotValidException {
        User newUser = this.userService.updateUser(user);
        if (newUser == null) {
            throw new UserNotValidException();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable("id") String id) {
        this.userService.deleteUser(id);
    }


}
