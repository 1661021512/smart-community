package club.yunzhi.smartcommunity.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StudentController {

  @GetMapping("{id}")
  public Student getNameById(@PathVariable Long id) {
    return new Student("测试姓名");
  }
  public static class Student {
    private String name;

    public Student(String name) {
      this.name = name;
    }

    public String getName() {
      return name;
    }

    public void setName(String name) {
      this.name = name;
    }
  }
}

