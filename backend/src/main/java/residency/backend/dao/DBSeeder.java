package residency.backend.dao;


import residency.backend.model.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigInteger;
import java.util.*;
import java.security.*;


@Component
public class DBSeeder implements CommandLineRunner {

    private TaskRepository taskRepository;
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private ResidencyRepository residencyRepository;
    private SubTaskRepository subTaskRepository;
    private TimeSheetRepository timeSheetRepository;
    private AuditRepository auditRepository;

    public DBSeeder(TaskRepository taskRepository, UserRepository userRepository, RoleRepository roleRepository, ResidencyRepository residencyRepository, SubTaskRepository subTaskRepository, TimeSheetRepository timeSheetRepository, AuditRepository auditRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.residencyRepository = residencyRepository;
        this.subTaskRepository = subTaskRepository;
        this.timeSheetRepository = timeSheetRepository;
        this.auditRepository = auditRepository;
    }


    @Override
    public void run(String... args) throws Exception {

        List<Room> habitaciones = new ArrayList<>();
        List<Room> habitaciones2 = new ArrayList<>();
        for (int i = 1; i <= 10; i++) {
            habitaciones.add(new Room(i+""));
        }
        for (int i = 1; i <= 5; i++) {
            habitaciones2.add(new Room(i+""));
        }
        habitaciones.add(new Room("Comedor"));
        habitaciones.add(new Room("Sala Comun Planta Baja"));
        habitaciones.add(new Room("Sala Gerencia"));

        habitaciones2.add(new Room("Sala Comun Planta 1"));
        habitaciones2.add(new Room("Sala Administración"));
        habitaciones2.add(new Room("Salon Principal"));

        habitaciones2.add(new Room("Habitación de Juegos"));
        habitaciones2.add(new Room("Sala Television"));


        Floor f1 = new Floor(1, habitaciones);
        Floor f2 = new Floor(2, habitaciones2);

        Residency abuelito = new Residency("Residencia El Abuelito", "Santa María de Guía", Arrays.asList(f1, f2));
        abuelito.setId("Abuelito");
        this.residencyRepository.deleteAll();
        this.residencyRepository.saveAll(Arrays.asList(abuelito));


        List<Date> workDays1 = new ArrayList<>();

        workDays1.add(new GregorianCalendar(2020,Calendar.MARCH,19).getTime());
        workDays1.add(new GregorianCalendar(2020,Calendar.MARCH,20).getTime());
        workDays1.add(new GregorianCalendar(2020,Calendar.MARCH,21).getTime());
        workDays1.add(new GregorianCalendar(2020,Calendar.MARCH,22).getTime());
        workDays1.add(new GregorianCalendar(2020,Calendar.MARCH,23).getTime());




        TimeSheet morning = new TimeSheet("Morning", "08:00", "16:00", workDays1);
        morning.setId("morning");
        TimeSheet afternoon = new TimeSheet("Afternoon", "16:00", "24:00", workDays1);
        afternoon.setId("afternoon");
        this.timeSheetRepository.deleteAll();
        this.timeSheetRepository.saveAll(Arrays.asList(morning, afternoon));

        SubTask lh = new SubTask("Limpieza habitual", Arrays.asList("Cambiar Jabon", "Limpiar lavamano"));
        lh.setId("LH");
        SubTask lu = new SubTask("Limpieza urgente", Arrays.asList("Limpiar el suelo", "Fregar lavamano", "Recoger escrementos"));
        lu.setId("LU");
        SubTask rm = new SubTask("Reponer material", Arrays.asList("Cambiar papel", "Reponer jabón", "Reponer toallas"));
        rm.setId("RM");
        SubTask pr = new SubTask("Preparacion", Arrays.asList("Poner papel", "Poner jabon", "Limpiar lavamano", "Limpiar inodoro"));
        pr.setId("PR");
        SubTask otro = new SubTask("Otro", new ArrayList<>());
        otro.setId("OTRO");
        this.subTaskRepository.deleteAll();
        this.subTaskRepository.saveAll(Arrays.asList(lh, lu, rm, pr, otro));


        Role jefeDepartamento = new Role("Jefe Departamento");
        jefeDepartamento.setId("jefeDepartamento");
        Role trabajador = new Role("Trabajador");
        trabajador.setId("trabajador");
        this.roleRepository.deleteAll();
        this.roleRepository.saveAll(Arrays.asList(jefeDepartamento, trabajador));


        User jefe1 = new User("Adriel", "García Díaz", "789456123E", jefeDepartamento, "resp", md5Creator("1234"), morning);
        jefe1.setId("jefe1");
        User jefe2 = new User("Ana", "Díaz Rodríguez", "369852217O", jefeDepartamento, "resp2", md5Creator("1234"), afternoon);
        jefe2.setId("jefe2");


        User trabajador1 = new User("Raul", "García Díaz", "123456789A", trabajador, "emp1", md5Creator("1234"), morning);
        trabajador1.setId("trabajador1");
        User trabajador2 = new User("Miriam", "Benitez García", "45396676N", trabajador, "emp2", md5Creator("1234"), afternoon);
        trabajador2.setId("trabajador2");
        User trabajador3 = new User("Marta", "Diaz Gutierrez", "56935478N", trabajador, "emp3", md5Creator("1234"), afternoon);
        trabajador3.setId("trabajador3");
        User trabajador4 = new User("Borja", "Diaz Gutierrez", "63255412N", trabajador, "emp4", md5Creator("1234"), morning);
        trabajador4.setId("trabajador4");
        User trabajador5 = new User("Lorenzo", "García Pérez", "42322115K", trabajador, "emp5", md5Creator("1234"), afternoon);
        trabajador5.setId("trabajador5");
        User trabajador6 = new User("Aimar", "Díaz Rodríguez", "55446638L", trabajador, "emp6", md5Creator("1234"), morning);
        trabajador6.setId("trabajador6");


        this.userRepository.deleteAll();
        this.userRepository.saveAll(Arrays.asList(jefe1, jefe2, trabajador1, trabajador2, trabajador3, trabajador4, trabajador5, trabajador6));


        Task task1 = new Task(new Date(), lu, trabajador1, 1, habitaciones.get(1), "informacion1", "Pending", jefe1);
        Task task2 = new Task(new Date(), lh, trabajador1, 1, habitaciones.get(2), "informacion2", "In Progress", jefe1);
        Task task3 = new Task(new Date(), rm, trabajador2, 2, habitaciones.get(3), "informacion3", "Finalized", jefe2);
        Task task4 = new Task(new Date(), pr, trabajador2, 2, habitaciones.get(4), "informacion4", "In Progress", jefe2);

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

        Date date = new Date();
        date.setHours(3);
        Audit audit1 = new Audit("State", "Pending", "In Progress", (Date) date.clone());
        audit1.setId(java.util.UUID.randomUUID().toString());
        date.setHours(6);
        Audit audit2 = new Audit("State", "In Progress", "Finalized", (Date) date.clone());
        audit2.setId(java.util.UUID.randomUUID().toString());
        date.setHours(8);
        Audit audit3 = new Audit("State", "Pending", "Finalized", (Date) date.clone());
        audit3.setId(java.util.UUID.randomUUID().toString());
        date.setHours(12);
        Audit audit4 = new Audit("State", "Finalized", "In Progress", (Date) date.clone());
        audit4.setId(java.util.UUID.randomUUID().toString());
        date.setHours(4);
        Audit audit5 = new Audit("State", "Finalized", "Pending", (Date) date.clone());
        audit5.setId(java.util.UUID.randomUUID().toString());
        date.setHours(7);
        Audit audit6 = new Audit("State", "", "Pending", (Date) date.clone());
        audit6.setId(java.util.UUID.randomUUID().toString());

        this.auditRepository.deleteAll();
        this.auditRepository.saveAll(Arrays.asList(audit1, audit2, audit3, audit4, audit5, audit6));

        task1.getAudits().add(audit6);
        task1.getAudits().add(audit1);
        task1.getAudits().add(audit2);

        task2.getAudits().add(audit6);
        task2.getAudits().add(audit3);

        task3.getAudits().add(audit6);
        task3.getAudits().add(audit2);
        task3.getAudits().add(audit4);
        task3.getAudits().add(audit1);


        task4.getAudits().add(audit6);
        task4.getAudits().add(audit1);


        this.taskRepository.deleteAll();
        this.taskRepository.saveAll(Arrays.asList(task1, task2, task3, task4));


    }

    private String md5Creator(String password) throws NoSuchAlgorithmException {
        MessageDigest md5 = MessageDigest.getInstance("MD5");
        md5.update(password.getBytes());

        byte[] bytes = md5.digest();
        BigInteger number = new BigInteger(1, bytes);
        String hashPassword = number.toString(16);

        while (hashPassword.length() < 32) {
            hashPassword = "0" + hashPassword;
        }
        return hashPassword;
    }

}
