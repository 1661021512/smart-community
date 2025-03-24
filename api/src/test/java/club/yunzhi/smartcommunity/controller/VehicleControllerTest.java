package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.service.VehicleService;
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

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class VehicleControllerTest extends ControllerTest {
  private final static Logger logger = LoggerFactory.getLogger(VehicleControllerTest.class);
  private final String baseUrl = "/vehicle";

  @MockBean
  VehicleService vehicleService;

  public static Vehicle getOneVehicle() {
    Resident owner = ResidentControllerTest.getOneResident();
    short status = 0;
    owner.setEmploymentStatus(status);
    Vehicle vehicle = new Vehicle();
    vehicle.setType(VehicleTypeControllerTest.getOneVehicleType());
    vehicle.setBrand(VehicleBrandControllerTest.getOneVehicleBrand());
    vehicle.setOwner(owner);
    vehicle.setColour(new Random().nextInt(9));
    vehicle.setPlateNumber(new RandomString().nextString());
    vehicle.setParkingSpaceNumber(new RandomString().nextString());
    vehicle.setParkingSpaceType(new Random().nextBoolean());
    return vehicle;
  }

  @Test
  void page() throws Exception {
    String url = baseUrl + "/page";
    Long villageId = new Random().nextLong();
    Long typeId = new Random().nextLong();
    String ownerName = new RandomString().nextString();
    String plateNumber = new RandomString().nextString();

    Integer page = Math.abs(new Random().nextInt());
    Integer size = Math.abs(new Random().nextInt() % 2000);
    List<Vehicle> vehicles = new ArrayList<>();

    for (int i = 0; i < 20; i++) {
      Vehicle vehicle = getOneVehicle();
      vehicle.setId(new Random().nextLong());
      vehicles.add(vehicle);
    }

    Page<Vehicle> vehiclePage = new PageImpl<>(vehicles);

    Mockito.doReturn(vehiclePage).when(this.vehicleService)
            .page(Mockito.anyLong(),
                    Mockito.anyLong(),
                    Mockito.anyString(),
                    Mockito.anyString(),
                    Mockito.any(Pageable.class));

    mockMvc.perform(MockMvcRequestBuilders.get(url)
                    .queryParam("villageId", villageId.toString())
                    .queryParam("type", typeId.toString())
                    .queryParam("plateNumber", plateNumber)
                    .queryParam("ownerName", ownerName)
                    .queryParam("page", page.toString())
                    .queryParam("size", size.toString()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(20))
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].type").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].brand").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].owner").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].colour").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].plateNumber").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].parkingSpaceNumber").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].parkingSpaceType").exists())
            .andExpect(MockMvcResultMatchers.status().isOk());
  }

  @Test
  void save() throws Exception {
    Vehicle vehicle = getOneVehicle();
    String jsonString = JSON.toJSONString(vehicle, SerializerFeature.DisableCircularReferenceDetect);
    Mockito.doReturn(vehicle).when(this.vehicleService).save(Mockito.any(Vehicle.class));
    MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.post(baseUrl)
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonString);
    mockMvc.perform(postBuilder)
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(vehicle.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.type").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.brand").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.owner").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.colour").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.plateNumber").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.parkingSpaceNumber").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.parkingSpaceType").exists())
            .andExpect(MockMvcResultMatchers.status().is(200));

    ArgumentCaptor<Vehicle> vehicleArgumentCaptor = ArgumentCaptor.forClass(Vehicle.class);
    Mockito.verify(this.vehicleService).save(vehicleArgumentCaptor.capture());
    Assertions.assertEquals(vehicle.getBrand(), vehicleArgumentCaptor.getValue().getBrand());
    Assertions.assertEquals(vehicle.getColour(), vehicleArgumentCaptor.getValue().getColour());
    Assertions.assertEquals(vehicle.getOwner(), vehicleArgumentCaptor.getValue().getOwner());
    Assertions.assertEquals(vehicle.getPlateNumber(), vehicleArgumentCaptor.getValue().getPlateNumber());
    Assertions.assertEquals(vehicle.getType(), vehicleArgumentCaptor.getValue().getType());
    Assertions.assertEquals(vehicle.getParkingSpaceNumber(), vehicleArgumentCaptor.getValue().getParkingSpaceNumber());
    Assertions.assertEquals(vehicle.getParkingSpaceType(), vehicleArgumentCaptor.getValue().getParkingSpaceType());
  }

  @Test
  void delete() throws Exception {
    Long id = new Random().nextLong();

    String url = baseUrl + "/" + id.toString();

    mockMvc.perform(MockMvcRequestBuilders.delete(url))
            .andExpect(MockMvcResultMatchers.status().is(200));

    // 断言调用方法符合预期
    ArgumentCaptor<Long> IntegerArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.vehicleService).delete(IntegerArgumentCaptor.capture());
    Assertions.assertEquals(IntegerArgumentCaptor.getValue(), id);
  }

  @Test
  void getById() throws Exception {
    Long id = new Random().nextLong();
    String url = baseUrl + "/" + id.toString();
    Vehicle vehicle = getOneVehicle();
    Mockito.doReturn(vehicle).when(this.vehicleService).getById(Mockito.anyLong());
    mockMvc.perform(MockMvcRequestBuilders.get(url))
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(vehicle.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.type").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.brand").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.owner").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.colour").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.plateNumber").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.parkingSpaceNumber").exists())
            .andExpect(MockMvcResultMatchers.jsonPath("$.parkingSpaceType").exists())
            .andExpect(MockMvcResultMatchers.status().is(200));
  }

  @Test
  void update() throws Exception {
    Long id = new Random().nextLong();
    Vehicle oldVehicle = getOneVehicle();
    oldVehicle.setId(id);
    Vehicle newVehicle = getOneVehicle();
    String jsonString = JSON.toJSONString(oldVehicle, SerializerFeature.DisableCircularReferenceDetect);

    String url = baseUrl + "/" + id.toString();

    Mockito.doReturn(newVehicle).when(this.vehicleService).update(Mockito.anyLong(), Mockito.any(Vehicle.class));

    MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders
            .put(url)
            .contentType(MediaType.APPLICATION_JSON)
            .content(jsonString);

    this.mockMvc.perform(putRequest)
            .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newVehicle.getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.type").value(newVehicle.getType()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.brand").value(newVehicle.getBrand()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.owner.id").value(newVehicle.getOwner().getId()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.colour").value(newVehicle.getColour()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.plateNumber").value(newVehicle.getPlateNumber()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.parkingSpaceNumber").value(newVehicle.getParkingSpaceNumber()))
            .andExpect(MockMvcResultMatchers.jsonPath("$.parkingSpaceType").value(newVehicle.getParkingSpaceType()))
            .andDo(print())
            .andExpect(status().isOk());

    ArgumentCaptor<Vehicle> vehicleArgumentCaptor = ArgumentCaptor.forClass(Vehicle.class);
    ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
    Mockito.verify(this.vehicleService).update(longArgumentCaptor.capture(), vehicleArgumentCaptor.capture());
    Assertions.assertEquals(oldVehicle.getBrand(), vehicleArgumentCaptor.getValue().getBrand());
    Assertions.assertEquals(oldVehicle.getColour(), vehicleArgumentCaptor.getValue().getColour());
    Assertions.assertEquals(oldVehicle.getOwner(), vehicleArgumentCaptor.getValue().getOwner());
    Assertions.assertEquals(oldVehicle.getPlateNumber(), vehicleArgumentCaptor.getValue().getPlateNumber());
    Assertions.assertEquals(oldVehicle.getType(), vehicleArgumentCaptor.getValue().getType());
    Assertions.assertEquals(oldVehicle.getParkingSpaceNumber(), vehicleArgumentCaptor.getValue().getParkingSpaceNumber());
    Assertions.assertEquals(oldVehicle.getParkingSpaceType(), vehicleArgumentCaptor.getValue().getParkingSpaceType());
  }
}