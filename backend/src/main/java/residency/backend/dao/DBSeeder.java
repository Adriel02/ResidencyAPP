package residency.backend.dao;


import residency.backend.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

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

        List<Room> habitaciones = new ArrayList<>();
        List<Room> habitaciones2 = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            habitaciones.add(new Room(i));
        }
        for (int i = 1; i <= 5; i++) {
            habitaciones.add(new Room(i));
        }
        Floor f1 = new Floor(1, habitaciones);
        Floor f2 = new Floor(2, habitaciones2);

        Residency abuelito = new Residency("Residencia El Abuelito", "Santa María de Guía", Arrays.asList(f1,f2));
        abuelito.setId("Abuelito");
        this.residencyRepository.deleteAll();
        this.residencyRepository.saveAll(Arrays.asList(abuelito));


        SubTask subTask1 = new SubTask("Limpieza habitual", Arrays.asList("Cambiar Jabon", "Limpiar lavamano"));
        subTask1.setId("LH");
        SubTask subTask2 = new SubTask("Limpieza urgente", Arrays.asList("Limpiar el suelo", "Fregar lavamano", "Recoger escrementos"));
        subTask2.setId("LU");
        SubTask subTask3 = new SubTask("Reponer material", Arrays.asList("Cambiar papel", "Reponer jabón", "Reponer toallas"));
        subTask3.setId("RM");
        SubTask subTask4 = new SubTask("Preparacion", Arrays.asList("Poner papel", "Poner jabon", "Limpiar lavamano", "Limpiar inodoro"));
        subTask4.setId("PR");
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



        Task task1 = new Task(new Date(),subTask1,trabajador1,1,habitaciones.get(1),"informacion1","Pending");
        Task task2 = new Task(new Date(),subTask2,trabajador1,1,habitaciones.get(2),"informacion2","Pending");
        Task task3 = new Task(new Date(),subTask3,trabajador1,1,habitaciones.get(3),"informacion3","Pending");
        Task task4 = new Task(new Date(),subTask2,trabajador1,1,habitaciones.get(4),"informacion4","In Progress");
        Task task5 = new Task(new Date(),subTask4,trabajador2,2,habitaciones.get(5),"informacion5","In Progress");
        Task task6 = new Task(new Date(),subTask3,trabajador2,2,habitaciones.get(6),"informacion6","In Progress");
        Task task7 = new Task(new Date(),subTask4,trabajador2,2,habitaciones.get(7),"informacion7","Finalized");
        Task task8 = new Task(new Date(),subTask4,trabajador2,2,habitaciones.get(8),"informacion8","Finalized");

        List<Boolean> finalized = new ArrayList<>();
        List<Boolean> inProgress= new ArrayList<>();
        List<Boolean> pending= new ArrayList<>();

        finalized.add(true);
        finalized.add(false);
        inProgress.add(false);
        inProgress.add(true);
        pending.add(false);


        task4.setIsFinished(inProgress);
        task5.setIsFinished(inProgress);
        task6.setIsFinished(inProgress);
        task7.setIsFinished(finalized);
        task8.setIsFinished(finalized);

        this.taskRepository.deleteAll();
        this.taskRepository.saveAll(Arrays.asList(task1, task2,task3,task4,task5,task6,task7,task8));
    }
}
