package residency.backend.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import residency.backend.model.Audit;

@Repository
public interface AuditRepository extends MongoRepository<Audit,String> {
}
