package club.yunzhi.smartcommunity.aspects;

import club.yunzhi.smartcommunity.controller.StudentController;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class AddYzAspect {
  @AfterReturning(value = "execution(* club.yunzhi.smartcommunity.controller.StudentController.getNameById(..))",
      returning = "student")
  public void afterReturnName(StudentController.Student student) {
    student.setName(student.getName() + "Yz");
  }
}
