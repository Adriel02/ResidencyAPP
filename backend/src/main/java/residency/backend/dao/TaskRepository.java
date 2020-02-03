package residency.backend.dao;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import residency.backend.model.Task;

import java.util.List;


@Repository
public interface TaskRepository extends MongoRepository<Task,String> {

    List<Task> findAllByUserId(String id);

    List<Task> findAllByState(String state);

}
