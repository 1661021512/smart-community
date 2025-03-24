package club.yunzhi.smartcommunity.aspects.volunteeractivity;

import club.yunzhi.smartcommunity.entity.VolunteerActivitySignUp;
import club.yunzhi.smartcommunity.service.VolunteerActivityService;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class UpdateNumberOfApplicants {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());

  private final VolunteerActivityService volunteerActivityService;

  public UpdateNumberOfApplicants(VolunteerActivityService volunteerActivityService) {
    this.volunteerActivityService = volunteerActivityService;
  }

  @AfterReturning(value = "execution(* club.yunzhi.smartcommunity.service.VolunteerActivitySignUpServiceImpl.save(..))",
      returning = "signUp")
  public void afterReturnPage(VolunteerActivitySignUp signUp) {
    this.logger.debug("执行切面");
    this.volunteerActivityService.updateNumberOfApplicants(signUp.getVolunteerActivity().getId());
  }
}
