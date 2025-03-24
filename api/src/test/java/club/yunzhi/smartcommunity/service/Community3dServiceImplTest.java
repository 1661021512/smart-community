package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.Community3d;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class Community3dServiceImplTest {
  private final Community3dServiceImpl community3dService;
  private final Community3dRepository community3dRepository;

  public Community3dServiceImplTest() {
    this.community3dRepository = Mockito.mock(Community3dRepository.class);
    this.community3dService = new Community3dServiceImpl(this.community3dRepository);
  }

  @Test
  void getAll() {
    List<Community3d> list = new ArrayList<>();
    Mockito.doReturn(list).when(this.community3dRepository).findAll();
    Assertions.assertEquals(list, this.community3dService.getAll());
  }
}