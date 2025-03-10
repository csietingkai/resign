package io.tingkai.resign;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
@ComponentScan(basePackages = { "io.tingkai.base", "io.tingkai.auth", "io.tingkai.resign" })
@EnableScheduling
public class ResignApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResignApplication.class, args);
	}
}
