package club.yunzhi.smartcommunity;

import club.yunzhi.smartcommunity.repository.SoftDeleteRepositoryFactoryBean;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableJpaRepositories(value = "club.yunzhi.smartcommunity",
		repositoryFactoryBeanClass = SoftDeleteRepositoryFactoryBean.class)
public class SmartCommunityApplication {
	public static void main(String[] args) {
		SpringApplication.run(SmartCommunityApplication.class, args);
	}
}
