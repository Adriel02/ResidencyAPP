package residency.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import residency.backend.dao.UserRepository;
import residency.backend.dto.UserDTO;
import residency.backend.model.User;

import java.util.Optional;

@Service
public class FakeLoginService {
    private UserRepository userRepository;

    @Autowired
    public FakeLoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public UserDTO getUser(String userName) {
        Optional <User> user = userRepository.findByUsername(userName);
        return convertModelToDTO(user);
    }

    private UserDTO convertModelToDTO(Optional<User> user) {
        User userLogin = user.get();
        UserDTO userDTO = new UserDTO(userLogin.getName(), userLogin.getSurname(), userLogin.getRole(), userLogin.getUsername());
        userDTO.setId(userLogin.getId());
        return userDTO;
    }
}
