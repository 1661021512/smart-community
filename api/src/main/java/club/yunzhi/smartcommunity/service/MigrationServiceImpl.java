package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Migration;
import club.yunzhi.smartcommunity.repository.MigrationRepository;
import org.springframework.stereotype.Service;

@Service
public class MigrationServiceImpl implements MigrationService {
  private final MigrationRepository migrationRepository;

  public MigrationServiceImpl(MigrationRepository migrationRepository) {
    this.migrationRepository = migrationRepository;
  }

  @Override
  public boolean existsByBatch(String batch) {
    return this.migrationRepository.existsByBatch(batch);
  }

  @Override
  public Migration save(String batch) {
    Migration migration = new Migration();
    migration.setBatch(batch);
    return this.migrationRepository.save(migration);
  }
}
