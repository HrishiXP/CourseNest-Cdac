package coursenest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import coursenest.entities.Admin;
import coursenest.services.AdminService;



@SpringBootApplication
@EnableConfigurationProperties(coursenest.utils.DiskStorageProperties.class)
@EnableJpaAuditing
public class CourseNestBackendApplication {

    private static final Logger log = LoggerFactory.getLogger(CourseNestBackendApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(CourseNestBackendApplication.class, args);
    }

    @Bean
    public CommandLineRunner demo(AdminService srv) {
        return (args) -> {
            if (srv.countAdmin() == 0) {
                Admin admin = new Admin();
                admin.setUserid("admin");
                admin.setPwd("admin");
                admin.setUname("Administrator");
                srv.updateAdmin(admin);
                log.info("Admin user created successfully");
            }
        };
    }
}


