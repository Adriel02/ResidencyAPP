package residency.backend.dao;


import org.springframework.data.mongodb.repository.MongoRepository;
import residency.backend.model.SubTask;

public interface SubTaskRepository extends MongoRepository<SubTask,String> {

}
