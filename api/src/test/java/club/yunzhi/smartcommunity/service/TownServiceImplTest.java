package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.County;
import club.yunzhi.smartcommunity.entity.Town;
import club.yunzhi.smartcommunity.repository.CountyRepository;
import club.yunzhi.smartcommunity.repository.DistrictRepository;
import club.yunzhi.smartcommunity.repository.TownRepository;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Calendar;
import java.util.Optional;


/**
 * @author panjie 3792535@qq.com
 * @date 2021/9/21
 * @blog https://segmentfault.com/u/myskies
 * @description
 */
class TownServiceImplTest {
  final TownServiceImpl townService;
  final TownRepository townRepository;
  final CountyRepository countyRepository;
  final DistrictRepository districtRepository;
  final DistrictService districtService;
  final CommunityService communityService;

  public TownServiceImplTest() {
    this.townRepository = Mockito.mock(TownRepository.class);
    this.countyRepository = Mockito.mock(CountyRepository.class);
    this.districtRepository = Mockito.mock(DistrictRepository.class);
    this.districtService = Mockito.mock(DistrictService.class);
    this.communityService = Mockito.mock(CommunityService.class);
    this.townService = new TownServiceImpl(
        townRepository,
        countyRepository,
        districtRepository,
        districtService,
        communityService);
  }

  @Test
  void save() {
    Town town = new Town();
    town.setName(RandomString.make(4));
    town.setPinyin(RandomString.make(4));

    Mockito.doReturn(Optional.of(new County())).when(this.countyRepository).findTopBydeletedIsFalseOrderByIdDesc();

    this.townService.save(town);

//    Assertions.assertEquals(region, town.getRegion());
    Mockito.verify(this.townRepository).save(town);
  }

  @Test
  void time() {
    Calendar calendar = Calendar.getInstance();
    calendar.setLenient(false);
    calendar.set(1947, 3, 15, 0, 0, 0);
    Assertions.assertThrows(IllegalArgumentException.class, () -> calendar.getTimeInMillis());
  }
}