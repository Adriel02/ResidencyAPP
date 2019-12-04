package residency.backend.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import residency.backend.model.User;

import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends MongoRepository<User, String>{

    Optional<User> findByUsername(String username);

    List<User> findAllByRole(String role);

    List<User> findAllByTimeSheet(String timeSheet);

    List<User> findAllByRoleAndTimeSheet(String role, String timeSheet);

}
