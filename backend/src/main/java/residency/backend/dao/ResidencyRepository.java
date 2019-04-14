package residency.backend.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import residency.backend.model.Residency;

public interface ResidencyRepository extends MongoRepository<Residency,String> {
}
