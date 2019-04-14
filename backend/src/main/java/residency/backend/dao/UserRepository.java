package residency.backend.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import residency.backend.model.User;

import java.util.List;


@Repository
public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);

    List<User> findAllByRole(String role);

}
