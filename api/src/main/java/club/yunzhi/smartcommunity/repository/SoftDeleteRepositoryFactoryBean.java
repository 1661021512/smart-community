package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.SoftDeleteEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactory;
import org.springframework.data.jpa.repository.support.JpaRepositoryFactoryBean;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.data.repository.core.RepositoryInformation;
import org.springframework.data.repository.core.RepositoryMetadata;
import org.springframework.data.repository.core.support.RepositoryFactorySupport;

import javax.persistence.EntityManager;
import java.io.Serializable;

public class SoftDeleteRepositoryFactoryBean<R extends JpaRepository<T, Serializable>, T> extends JpaRepositoryFactoryBean<R, T, Serializable> {
  public SoftDeleteRepositoryFactoryBean(Class<? extends R> repositoryInterface) {
    super(repositoryInterface);
  }

  @Override
  protected RepositoryFactorySupport createRepositoryFactory(final EntityManager entityManager) {
    return new JpaRepositoryFactory(entityManager) {
      protected SimpleJpaRepository<T, Serializable> getTargetRepository(
          RepositoryInformation information, EntityManager entityManager) {
        Class<T> domainClass = (Class<T>) information.getDomainType();
        if(SoftDeleteEntity.class.isAssignableFrom(domainClass)) {
          return new SoftDeleteRepositoryImpl(domainClass, entityManager);
        } else {
          return new SimpleJpaRepository(domainClass, entityManager);
        }
      }

      @Override
      protected Class<?> getRepositoryBaseClass(RepositoryMetadata metadata) {
        return metadata.getDomainType().isAssignableFrom(SoftDeleteEntity.class) ? SoftDeleteRepositoryImpl.class : SimpleJpaRepository.class;
      }
    };
  }
}
