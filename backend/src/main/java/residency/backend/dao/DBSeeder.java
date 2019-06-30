package residency.backend.dao;


import residency.backend.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;

@Component
public class DBSeeder implements CommandLineRunner {

    private TaskRepository taskRepository;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private ResidencyRepository residencyRepository;
    private SubTaskRepository subTaskRepository;


    public DBSeeder(TaskRepository taskRepository, UserRepository userRepository, RoleRepository roleRepository, ResidencyRepository residencyRepository, SubTaskRepository subTaskRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.residencyRepository = residencyRepository;
        this.subTaskRepository = subTaskRepository;
    }


    @Override
    public void run(String... args) throws Exception {

        Residency menestera = new Residency("Residencia La Menestera", "Galdar", Arrays.asList(1, 2, 3, 4, 5));
        Residency abuelito = new Residency("Residencia El Abuelito", "Santa María de Guía", Arrays.asList(1, 2, 3));
        this.residencyRepository.deleteAll();
        this.residencyRepository.saveAll(Arrays.asList(menestera, abuelito));


        SubTask subTask = new SubTask("Limpieza Normal", Arrays.asList("Cambiar Jabon", "Limpiar lavamano"));
        SubTask subTask2 = new SubTask("Limpieza Urgente", Arrays.asList("Limpar", "Limpiar el suelo", "Fregar lavamano", "Recoger escremento"));
        this.subTaskRepository.deleteAll();
        this.subTaskRepository.saveAll(Arrays.asList(subTask, subTask2));


        Role jefeDepartamento = new Role("Jefe Departamento");
        jefeDepartamento.setId("jefedepartamento");
        Role trabajador = new Role("Trabajador");
        trabajador.setId("trabajador");
        this.roleRepository.deleteAll();
        this.roleRepository.saveAll(Arrays.asList(jefeDepartamento, trabajador));


        User jefe1 = new User("Adriel", "García Díaz", "789456123E", jefeDepartamento, "jefe1", "jefe1");
        jefe1.setId("jefe1");
        User jefe2 = new User("Ana", "Díaz Rodríguez", "369852217O", jefeDepartamento, "jefe2", "jefe2");
        jefe2.setId("jefe2");
        User trabajador1 = new User("Raul", "García Díaz", "123456789A", trabajador, "emp1", "1234");
        trabajador1.setId("trabajador1");
        User trabajador2 = new User("Lorenzo", "García Pérez", "456789123L", trabajador, "emp2", "1234");
        trabajador2.setId("trabajador2");
        this.userRepository.deleteAll();
        this.userRepository.saveAll(Arrays.asList(jefe1, jefe2, trabajador1, trabajador2));


        Task task1 = new Task(new Date(), subTask, trabajador1, "", "", "En progreso");
        Task task2 = new Task(new Date(), subTask2, trabajador2, "Papel en el suelo", "", "Cancelada");
        this.taskRepository.deleteAll();
        this.taskRepository.saveAll(Arrays.asList(task1, task2));
    }
}
