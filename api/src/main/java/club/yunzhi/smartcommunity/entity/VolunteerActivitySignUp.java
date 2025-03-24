package club.yunzhi.smartcommunity.entity;

import com.fasterxml.jackson.annotation.JsonView;
import org.hibernate.annotations.SQLDelete;
;
import org.springframework.util.Assert;

import javax.persistence.*;

/**
 * 活动报名信息
 */
@Entity
@SQLDelete(sql = "update `volunteer-activity-sign-up` set deleted = 1, delete_at = UNIX_TIMESTAMP() where id = ?")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"volunteer_activity_id", "volunteer_id", "deleteAt"}))
public class VolunteerActivitySignUp extends SoftDeleteEntity {
  /**
   * 新建
   */
  public static short STATUS_NEW = 0;
  /**
   * 审核通过
   */
  public static short STATUS_ACCEPTED = 1;

  /**
   * 拒绝
   */
  public static short STATUS_REFUSED = 2;

  @ManyToOne
  @JsonView(VolunteerActivityJsonView.class)
  @JoinColumn(nullable = false)
  private VolunteerActivity volunteerActivity;

  @ManyToOne
  @JsonView(VolunteerJsonView.class)
  @JoinColumn(nullable = false)
  private Volunteer volunteer;

  private short status = STATUS_NEW;

  public VolunteerActivity getVolunteerActivity() {
    return volunteerActivity;
  }

  public void setVolunteerActivity(VolunteerActivity volunteerActivity) {
    this.volunteerActivity = volunteerActivity;
  }

  public Volunteer getVolunteer() {
    return volunteer;
  }

  public void setVolunteer(Volunteer volunteer) {
    this.volunteer = volunteer;
  }

  public short getStatus() {
    return status;
  }

  public void setStatus(short status) {
    Assert.isTrue(status >= STATUS_NEW, "状态应该在0-2之间");
    Assert.isTrue(status <= STATUS_REFUSED, "状态应该在0-2之间");
    this.status = status;
  }

  public interface VolunteerActivityJsonView {
  }

  public interface VolunteerJsonView {
  }
}
