package residency.backend.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import residency.backend.model.Role;

public interface RoleRepository extends MongoRepository<Role, String> {

}
