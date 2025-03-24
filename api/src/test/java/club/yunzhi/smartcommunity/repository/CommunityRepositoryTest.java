package club.yunzhi.smartcommunity.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;

class CommunityRepositoryTest extends RepositoryTest {
  @Autowired
  CommunityRepository communityRepository;

  @Test
  void findAllByTownId() {
    this.communityRepository.findAllByParentId(new Random().nextLong());
  }

  @Test
  void getCurrentDate() {
    Date date = new Date();
    String strDateFormat = "yyMMdd";
    DateFormat dateFormat = new SimpleDateFormat(strDateFormat);
    String formattedDate= dateFormat.format(date);
    Long date1 = Long.parseLong(formattedDate);
    System.out.println(date1);
  }
}