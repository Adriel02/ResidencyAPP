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
        menestera.setId("Menestera");
        Residency abuelito = new Residency("Residencia El Abuelito", "Santa María de Guía", Arrays.asList(1, 2, 3));
        menestera.setId("Abuelito");
        this.residencyRepository.deleteAll();
        this.residencyRepository.saveAll(Arrays.asList(menestera, abuelito));


        SubTask subTask1 = new SubTask("Limpieza habitual", Arrays.asList("Cambiar Jabon", "Limpiar lavamano"));
        subTask1.setId("LimpiezaHabitual");
        SubTask subTask2 = new SubTask("Limpieza urgente", Arrays.asList("Limpiar el suelo", "Fregar lavamano", "Recoger escrementos"));
        subTask2.setId("LimpiezaUrgente");
        SubTask subTask3 = new SubTask("Reponer material", Arrays.asList("Cambiar papel", "Reponer jabón", "Reponer toallas"));
        subTask3.setId("ReponerMaterial");
        SubTask subTask4 = new SubTask("Preparacion", Arrays.asList("Poner papel", "Poner jabon", "Limpiar lavamano", "Limpiar inodoro"));
        subTask4.setId("Preparacion");
        this.subTaskRepository.deleteAll();
        this.subTaskRepository.saveAll(Arrays.asList(subTask1, subTask2,subTask3,subTask4));


        Role jefeDepartamento = new Role("Jefe Departamento");
        jefeDepartamento.setId("jefedepartamento");
        Role trabajador = new Role("Trabajador");
        trabajador.setId("trabajador");
        this.roleRepository.deleteAll();
        this.roleRepository.saveAll(Arrays.asList(jefeDepartamento, trabajador));


        User jefe1 = new User("Adriel", "García Díaz", "789456123E", jefeDepartamento, "resp", "1234");
        jefe1.setId("jefe1");
        User jefe2 = new User("Ana", "Díaz Rodríguez", "369852217O", jefeDepartamento, "resp2", "1234");
        jefe2.setId("jefe2");
        User trabajador1 = new User("Raul", "García Díaz", "123456789A", trabajador, "emp1", "1234");
        trabajador1.setId("trabajador1");
        User trabajador2 = new User("Miriam", "Benitez García", "45396676N", trabajador, "emp2", "1234");
        trabajador2.setId("trabajador2");
        this.userRepository.deleteAll();
        this.userRepository.saveAll(Arrays.asList(jefe1, jefe2, trabajador1, trabajador2));


        Task task1 = new Task(new Date(), subTask1, trabajador1, "", "asd3", "En progreso","105");
        Task task2 = new Task(new Date(), subTask2, trabajador2, "Papel en el suelo", "", "Cancelada","116");
        Task task3 = new Task(new Date(), subTask3, trabajador2, "Papel en el suelo", "asd2", "Cancelada","220");
        Task task4 = new Task(new Date(), subTask1, trabajador2, "", "", "En progreso","310");
        Task task5 = new Task(new Date(), subTask4, trabajador1, "Papel en el suelo", "asd1", "Cancelada","312");
        Task task6 = new Task(new Date(), subTask3, trabajador1, "", "Informacion adicional", "En progreso","514");
        this.taskRepository.deleteAll();
        this.taskRepository.saveAll(Arrays.asList(task1, task2,task3,task4,task5,task6));
    }
}
