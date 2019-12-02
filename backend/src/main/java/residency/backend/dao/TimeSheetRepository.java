package residency.backend.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import residency.backend.model.TimeSheet;

import java.util.List;
import java.util.Optional;

@Repository
public interface TimeSheetRepository extends MongoRepository<TimeSheet,String> {

    @Override
    Optional<TimeSheet> findById(String s);

    @Override
    List<TimeSheet> findAll();
}
