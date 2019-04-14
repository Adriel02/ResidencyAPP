package residency.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import residency.backend.dao.UserRepository;
import residency.backend.model.User;

import java.util.List;

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

    public User getUserByUserName(String username) {
        return this.userRepository.findByUsername(username);
    }

    public List<User> findAllByRole(String role) {
        return this.userRepository.findAllByRole(role);
    }

    public List<User> getAllUserByRole(String role) {
        return this.userRepository.findAllByRole(role);
    }

    public User createUser(User user) {
        if (isUserValid(user)) {
            this.userRepository.insert(user);
            return user;
        }
        return null;
    }

    public void updateUser(User user) {
        this.userRepository.save(user);
    }

    public void deleteUser(String id) {
        this.userRepository.deleteById(id);
    }

    private boolean isUserValid(User user) {
        return user.getDni() != null && user.getName() != null && user.getPassword() != null &&
                user.getRole() != null && user.getSurname() != null && user.getUsername() != null;

    }
}
