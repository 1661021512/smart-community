package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.Relationship;
import club.yunzhi.smartcommunity.service.RelationshipService;
import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.SortDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("relationship")
public class RelationshipController {
  private final RelationshipService relationshipService;

  public RelationshipController(RelationshipService relationshipService) {
    this.relationshipService = relationshipService;
  }

  @DeleteMapping("{id}")
  public void delete(@PathVariable Long id) {
    this.relationshipService.delete(id);
  }

  @GetMapping
  @JsonView(GetALLJsonView.class)
  public List<Relationship> getALL() {
    return relationshipService.findAll();
  }

  @GetMapping("{id}")
  @JsonView(GetByIdJsonView.class)
  public Relationship getById(@PathVariable Long id) {
    return this.relationshipService.getById(id);
  }

  @GetMapping("getByResidentIds")
  @JsonView(GetByIdJsonView.class)
  public Relationship getByResidentIds(@RequestParam Long oneRelationId, @RequestParam Long anotherRelationId) {
    return this.relationshipService.getByResidentIds(oneRelationId, anotherRelationId);
  }



  @GetMapping("page")
  @JsonView(PageJsonView.class)
  public Page<Relationship> page(
      @RequestParam(required = false, defaultValue = "") String name,
      @SortDefault.SortDefaults(@SortDefault(sort = "id", direction = Sort.Direction.DESC))
                                     Pageable pageable) {
    return this.relationshipService.page(name, pageable);
  }

  @PostMapping
  @JsonView(SaveJsonView.class)
  public Relationship save(@RequestBody Relationship relationship) {
    return this.relationshipService.save(relationship);
  }

  @PutMapping("{id}")
  @JsonView(UpdateJsonView.class)
  public Relationship update(@PathVariable Long id, @RequestBody Relationship relationship) {
    return this.relationshipService.update(id, relationship);
  }


  private class GetALLJsonView {
  }

  private class SaveJsonView {
  }

  private class PageJsonView {
  }

  private class GetByIdJsonView {
  }

  private class UpdateJsonView {
  }
}
