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
    private TimeSheetRepository timeSheetRepository;

    public DBSeeder(TaskRepository taskRepository, UserRepository userRepository, RoleRepository roleRepository, ResidencyRepository residencyRepository, SubTaskRepository subTaskRepository,TimeSheetRepository timeSheetRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.residencyRepository = residencyRepository;
        this.subTaskRepository = subTaskRepository;
        this.timeSheetRepository = timeSheetRepository;
    }


    @Override
    public void run(String... args) throws Exception {

        List<Room> habitaciones = new ArrayList<>();
        List<Room> habitaciones2 = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            habitaciones.add(new Room(i));
        }
        for (int i = 1; i <= 5; i++) {
            habitaciones2.add(new Room(i));
        }
        Floor f1 = new Floor(1, habitaciones);
        Floor f2 = new Floor(2, habitaciones2);

        Residency abuelito = new Residency("Residencia El Abuelito", "Santa María de Guía", Arrays.asList(f1, f2));
        abuelito.setId("Abuelito");
        this.residencyRepository.deleteAll();
        this.residencyRepository.saveAll(Arrays.asList(abuelito));

        TimeSheet morning = new TimeSheet("Morning","08:00","16:00");
        morning.setId("morning");
        TimeSheet afternoon = new TimeSheet("Afternoon","16:00","24:00");
        afternoon.setId("afternoon");
        this.timeSheetRepository.deleteAll();
        this.timeSheetRepository.saveAll(Arrays.asList(morning,afternoon));

        SubTask lh = new SubTask("Limpieza habitual", Arrays.asList("Cambiar Jabon", "Limpiar lavamano"));
        lh.setId("LH");
        SubTask lu = new SubTask("Limpieza urgente", Arrays.asList("Limpiar el suelo", "Fregar lavamano", "Recoger escrementos"));
        lu.setId("LU");
        SubTask rm = new SubTask("Reponer material", Arrays.asList("Cambiar papel", "Reponer jabón", "Reponer toallas"));
        rm.setId("RM");
        SubTask pr = new SubTask("Preparacion", Arrays.asList("Poner papel", "Poner jabon", "Limpiar lavamano", "Limpiar inodoro"));
        pr.setId("PR");
        this.subTaskRepository.deleteAll();
        this.subTaskRepository.saveAll(Arrays.asList(lh, lu, rm, pr));


        Role jefeDepartamento = new Role("Jefe Departamento");
        jefeDepartamento.setId("jefeDepartamento");
        Role trabajador = new Role("Trabajador");
        trabajador.setId("trabajador");
        this.roleRepository.deleteAll();
        this.roleRepository.saveAll(Arrays.asList(jefeDepartamento, trabajador));


        User jefe1 = new User("Adriel", "García Díaz", "789456123E", jefeDepartamento, "resp", "1234",morning);
        jefe1.setId("jefe1");
        User jefe2 = new User("Ana", "Díaz Rodríguez", "369852217O", jefeDepartamento, "resp2", "1234",afternoon);
        jefe2.setId("jefe2");
        User trabajador1 = new User("Raul", "García Díaz", "123456789A", trabajador, "emp1", "1234",morning);
        trabajador1.setId("trabajador1");
        User trabajador2 = new User("Miriam", "Benitez García", "45396676N", trabajador, "emp2", "1234",afternoon);
        trabajador2.setId("trabajador2");
        this.userRepository.deleteAll();
        this.userRepository.saveAll(Arrays.asList(jefe1, jefe2, trabajador1, trabajador2));


        Task task1 = new Task(new Date(), lu, trabajador1, 1, habitaciones.get(1), "informacion1", "Pending",jefe1);
        Task task2 = new Task(new Date(), lh, trabajador1, 1, habitaciones.get(2), "informacion2", "In Progress",jefe1);
        Task task3 = new Task(new Date(), rm, trabajador2, 2, habitaciones.get(3), "informacion3", "Finalized",jefe2);
        Task task4 = new Task(new Date(), pr, trabajador2, 2, habitaciones.get(4), "informacion4", "In Progress",jefe2);

        List<Boolean> finalized = new ArrayList<>();
        List<Boolean> inProgress = new ArrayList<>();
        List<Boolean> pending = new ArrayList<>();

        finalized.add(true);
        finalized.add(true);
        finalized.add(true);
        inProgress.add(false);
        inProgress.add(false);
        inProgress.add(false);
        inProgress.add(true);
        pending.add(false);
        pending.add(false);
        pending.add(false);

        task1.setIsFinished(pending);
        task2.setIsFinished(inProgress);
        task3.setIsFinished(finalized);
        task4.setIsFinished(inProgress);

        this.taskRepository.deleteAll();
        this.taskRepository.saveAll(Arrays.asList(task1, task2, task3, task4));
    }
}
