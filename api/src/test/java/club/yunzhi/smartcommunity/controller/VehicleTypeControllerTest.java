package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.VehicleType;
import club.yunzhi.smartcommunity.service.VehicleTypeService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class VehicleTypeControllerTest extends ControllerTest {
  private final static Logger logger = LoggerFactory.getLogger(VehicleTypeControllerTest.class);
  private final String baseUrl = "/vehicleType";

  @MockBean
  VehicleTypeService vehicleTypeService;

  public static VehicleType getOneVehicleType() {
    logger.debug("构造一个车辆类型");
    VehicleType vehicleType = new VehicleType();
    vehicleType.setId(new Random().nextLong());
    vehicleType.setName(new Random().toString());
    vehicleType.setWeight(new Random().nextLong());
    return vehicleType;
  }

  @Test
  void delete() throws Exception {
    Long id = new Random().nextLong();

    String url = baseUrl + "/" + id.toString();

    mockMvc.perform(MockMvcRequestBuilders.delete(url))
            .andExpect(MockMvcResultMatchers.status().is(200));

    // 断言调用方法符合预期
    ArgumentCaptor<Long> IntegerArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.vehicleTypeService).delete(IntegerArgumentCaptor.capture());
    Assertions.assertEquals(IntegerArgumentCaptor.getValue(), id);
  }

  @Test
  void nameIsAvailableWithId() throws Exception {
    String name = RandomString.make(6);
    Long id = new Random().nextLong();
    Mockito.doReturn(true).when(this.vehicleTypeService).nameIsAvailable(Mockito.eq(name), Mockito.eq(id));
    this.mockMvc.perform(MockMvcRequestBuilders.get(this.baseUrl + "/nameIsAvailable")
                    .queryParam("name", name)
                    .queryParam("id", id.toString()))
            .andExpect(MockMvcResultMatchers.content().string("true"))
            .andExpect(MockMvcResultMatchers.status().isOk());

    // 断言调用方法符合预期
    ArgumentCaptor<String> StringArgumentCaptor = ArgumentCaptor.forClass(String.class);
    ArgumentCaptor<Long> LongArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.vehicleTypeService).nameIsAvailable(StringArgumentCaptor.capture(), LongArgumentCaptor.capture());
    Assertions.assertEquals(StringArgumentCaptor.getValue(), name);
    Assertions.assertEquals(LongArgumentCaptor.getValue(), id);
  }

  @Test
  void nameIsAvailableWithoutId() throws Exception {
    String name = RandomString.make(6);
    Long id = null;
    Mockito.doReturn(true).when(this.vehicleTypeService).nameIsAvailable(Mockito.eq(name), Mockito.eq(id));
    this.mockMvc.perform(MockMvcRequestBuilders.get(this.baseUrl + "/nameIsAvailable")
                    .queryParam("name", name))
            .andExpect(MockMvcResultMatchers.content().string("true"))
            .andExpect(MockMvcResultMatchers.status().isOk());

    // 断言调用方法符合预期
    ArgumentCaptor<String> StringArgumentCaptor = ArgumentCaptor.forClass(String.class);
    ArgumentCaptor<Long> LongArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.vehicleTypeService).nameIsAvailable(StringArgumentCaptor.capture(), LongArgumentCaptor.capture());
    Assertions.assertEquals(StringArgumentCaptor.getValue(), name);
    Assertions.assertNull(LongArgumentCaptor.getValue());
  }

  @Test
  void getAll() throws Exception {
    List<VehicleType> vehicleTypes= new ArrayList<>();
    for (int i = 0; i < 10; i++) {
      vehicleTypes.add(VehicleTypeControllerTest.getOneVehicleType());
    }

    Mockito.doReturn(vehicleTypes).when(this.vehicleTypeService).getAll();

    this.mockMvc.perform(MockMvcRequestBuilders.get(this.baseUrl)
                    .contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding("utf-8"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.length()").value(10))
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].id").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].name").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$[0].weight").exists())
            .andExpect(MockMvcResultMatchers.status().isOk());
    }

  @Test
  void getById() throws Exception {
    VehicleType vehicleType = getOneVehicleType();

    Mockito.doReturn(vehicleType).when(this.vehicleTypeService).getById(Mockito.anyLong());

    Integer id = vehicleType.getId().intValue();

    String url = baseUrl + "/" + id.toString();

    this.mockMvc.perform(MockMvcRequestBuilders.get(url)
                    .contentType(MediaType.APPLICATION_JSON)
                    .characterEncoding("utf-8"))
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(vehicleType.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.name").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.weight").exists())
            .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void page() throws Exception {
    String url = baseUrl + "/page";

    Integer page = Math.abs(new Random().nextInt());
    Integer size = Math.abs(new Random().nextInt() % 2000);

    List<VehicleType> vehicleTypes = new ArrayList<>();

    for (int i = 0; i < 20; i++) {
      vehicleTypes.add(getOneVehicleType());
    }

    Page<VehicleType> vehicleTypePage = new PageImpl<VehicleType>(vehicleTypes);

    Mockito.doReturn(vehicleTypePage).when(this.vehicleTypeService).page(Mockito.anyString(), Mockito.any(Pageable.class));

    mockMvc.perform(MockMvcRequestBuilders.get(url)
                    .queryParam("page", page.toString())
                    .queryParam("size", size.toString()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(20))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].name").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].weight").exists())
            .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void save() throws Exception {
    VehicleType vehicleType = getOneVehicleType();
    String jsonString = JSON.toJSONString(vehicleType, SerializerFeature.DisableCircularReferenceDetect);

    Mockito.doReturn(vehicleType).when(this.vehicleTypeService).save(Mockito.any(VehicleType.class));

    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.post(baseUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonString);
    mockMvc.perform(postBuilder)
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(vehicleType.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(vehicleType.getName()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.weight").value(vehicleType.getWeight()))
            .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<VehicleType> vehicleTypeArgumentCaptor = ArgumentCaptor.forClass(VehicleType.class);
    Mockito.verify(this.vehicleTypeService).save(vehicleTypeArgumentCaptor.capture());
    Assertions.assertEquals(vehicleType.getName(), vehicleTypeArgumentCaptor.getValue().getName());
    Assertions.assertEquals(vehicleType.getWeight(), vehicleTypeArgumentCaptor.getValue().getWeight());
  }

  @Test
  void update() throws Exception {
    Long id = new Random().nextLong();
    VehicleType oldVehicleType = getOneVehicleType();
    oldVehicleType.setId(id);
    VehicleType newVehicleType = getOneVehicleType();
    String jsonString = JSON.toJSONString(oldVehicleType, SerializerFeature.DisableCircularReferenceDetect);

    String url = baseUrl + "/" + id.toString();

    Mockito.doReturn(newVehicleType).when(this.vehicleTypeService).update(Mockito.anyLong(), Mockito.any(VehicleType.class));

    MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders
            .put(url)
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonString);

    this.mockMvc.perform(putRequest)
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newVehicleType.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(newVehicleType.getName()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.weight").value(newVehicleType.getWeight()))
            .andExpect(status().isOk());

    ArgumentCaptor<VehicleType> vehicleTypeArgumentCaptor = ArgumentCaptor.forClass(VehicleType.class);
    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.vehicleTypeService).update(longArgumentCaptor.capture(), vehicleTypeArgumentCaptor.capture());

    Assertions.assertEquals(oldVehicleType.getName(), vehicleTypeArgumentCaptor.getValue().getName());
    Assertions.assertEquals(oldVehicleType.getWeight(), vehicleTypeArgumentCaptor.getValue().getWeight());
  }
}