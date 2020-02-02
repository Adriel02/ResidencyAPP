package residency.backend.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import residency.backend.dao.UserRepository;
import residency.backend.dto.UserNoPasswordDTO;
import residency.backend.model.User;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUser() {
        return this.userRepository.findAll();
    }


    public List<User> getAllUserByRole(String role) {
        return this.userRepository.findAllByRole(role);
    }

    public List<User> getAllUserByTimeSheet(String timeSheet) {
        return this.userRepository.findAllByTimeSheet(timeSheet);
    }

    public List<User> getAllUserByRoleAndTimeSheet(String role, String timeSheet) {
        return this.userRepository.findAllByRoleAndTimeSheet(role, timeSheet);
    }

    public UserNoPasswordDTO getUserByUsername(String username) {
        Optional<User> user = this.userRepository.findByUsername(username);
        return convertModelToDTO(user);
    }

    public User createUser(User user) {
        if (isUserValid(user)) {
            this.userRepository.insert(user);
            return user;
        }
        return null;
    }

    public User updateUser(User user) {
        if (isUserValid(user)) {
            this.userRepository.save(user);
            return user;
        }
        return null;
    }

    public void deleteUser(String id) {
        this.userRepository.deleteById(id);
    }

    private boolean isUserValid(User user) {
        return user.getDni() != null && user.getName() != null && user.getPassword() != null &&
                user.getRole() != null && user.getSurname() != null && user.getUsername() != null
                && user.getTimeSheet() != null;

    }

    private UserNoPasswordDTO convertModelToDTO(Optional<User> user) {
        User userLogin = user.get();
        UserNoPasswordDTO userDTO = new UserNoPasswordDTO(userLogin.getName(), userLogin.getSurname(), userLogin.getDni(), userLogin.getRole(), userLogin.getUsername(), userLogin.getTimeSheet());
        userDTO.setId(userLogin.getId());
        return userDTO;
    }
}
