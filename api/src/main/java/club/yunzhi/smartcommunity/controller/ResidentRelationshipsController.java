package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.ResidentRelationships;
import club.yunzhi.smartcommunity.service.ResidentRelationshipsService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 居民间关系
 */
@RestController
@RequestMapping("residentRelationships")
public class ResidentRelationshipsController {
  private final ResidentRelationshipsService residentRelationshipsService;

  public ResidentRelationshipsController(ResidentRelationshipsService residentRelationshipsService) {
    this.residentRelationshipsService = residentRelationshipsService;
  }

  @GetMapping("getFromAllByResidentId/{residentId}")
  @JsonView(GetFromAllByResidentIdJsonView.class)
  public List<ResidentRelationships> getFromAllByResidentId(@PathVariable Long residentId) {
    return this.residentRelationshipsService.getFromAllByResidentId(residentId);
  }

  @PutMapping("updateBetweenTwoResidents")
  @JsonView(SaveJsonView.class)
  public void updateBetweenTwoResidents(@RequestBody UpdateBetweenTwoResidentsInput input) {

    this.residentRelationshipsService.updateBetweenTwoResidents(input.getRelationshipId(),
        input.getOneResidentId(),
        input.getAnotherResidentId());
  }

  public static class UpdateBetweenTwoResidentsInput {
    private Long relationshipId;
    private Long oneResidentId;
    private Long anotherResidentId;

    public Long getRelationshipId() {
      return relationshipId;
    }

    public void setRelationshipId(Long relationshipId) {
      this.relationshipId = relationshipId;
    }

    public Long getOneResidentId() {
      return oneResidentId;
    }

    public void setOneResidentId(Long oneResidentId) {
      this.oneResidentId = oneResidentId;
    }

    public Long getAnotherResidentId() {
      return anotherResidentId;
    }

    public void setAnotherResidentId(Long anotherResidentId) {
      this.anotherResidentId = anotherResidentId;
    }
  }

  private static class GetFromAllByResidentIdJsonView implements ResidentRelationships.OneResidentJsonView,
      ResidentRelationships.AnotherResidentJsonView,
      ResidentRelationships.RelationshipJsonView {
  }


  private static class SaveJsonView {
  }

}
