package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Community3d;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Community3dServiceImpl implements Community3dService {
  private final Community3dRepository community3dRepository;

  public Community3dServiceImpl(Community3dRepository community3dRepository) {
    this.community3dRepository = community3dRepository;
  }

  @Override
  public List<Community3d> getAll() {
    return (List<Community3d>) this.community3dRepository.findAll();
  }
}
