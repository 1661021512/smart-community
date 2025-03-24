package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Community3d;
import club.yunzhi.smartcommunity.service.Community3dService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 社区3D
 */
@RestController
@RequestMapping("community3d")
public class Community3dController {
  private final Community3dService community3dService;

  public Community3dController(Community3dService community3dService) {
    this.community3dService = community3dService;
  }

  @GetMapping
  @JsonView(GetAllJsonView.class)
  List<Community3d> getAll() {
    return this.community3dService.getAll();
  }

  private class GetAllJsonView {
  }
}
