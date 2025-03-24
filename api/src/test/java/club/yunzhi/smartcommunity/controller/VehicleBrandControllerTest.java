package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.VehicleBrand;
import club.yunzhi.smartcommunity.service.VehicleBrandService;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import net.bytebuddy.utility.RandomString;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.amqp.RabbitAutoConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class VehicleBrandControllerTest extends ControllerTest {
    private final static Logger logger = LoggerFactory.getLogger(VehicleBrandControllerTest.class);
    private final String baseUrl = "/vehicleBrand";

    @MockBean
    VehicleBrandService vehicleBrandService;

    public static VehicleBrand getOneVehicleBrand() {
        logger.debug("构造一个车辆品牌");
        VehicleBrand vehicleBrand = new VehicleBrand();
        vehicleBrand.setName(new Random().toString());
        return vehicleBrand;
    }

    @Test
    void delete() throws Exception {
        Long id = new Random().nextLong();

        String url = baseUrl + "/" + id.toString();

        mockMvc.perform(MockMvcRequestBuilders.delete(url))
                .andExpect(MockMvcResultMatchers.status().is(200));

        ArgumentCaptor<Long> argumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.vehicleBrandService).delete(argumentCaptor.capture());
        Assertions.assertEquals(argumentCaptor.getValue(), id);
    }

    @Test
    void page() throws Exception {
        String url = baseUrl + "/page";
        Integer page = Math.abs(new Random().nextInt());
        Integer size = Math.abs(new Random().nextInt() % 2000);
        List<VehicleBrand> vehicleBrands = new ArrayList<>();
        String name = new RandomString().nextString();
        for (int i = 0; i < 20; i++) {
            VehicleBrand vehicleBrand = getOneVehicleBrand();
            vehicleBrand.setId(new Random().nextLong());
            vehicleBrands.add(vehicleBrand);
        }
        Page<VehicleBrand> vehicleBrandPage = new PageImpl<>(vehicleBrands);
        Mockito.doReturn(vehicleBrandPage).when(this.vehicleBrandService)
                .page(Mockito.anyString(),
                        Mockito.any(Pageable.class));
        mockMvc.perform(MockMvcRequestBuilders.get(url)
                        .queryParam("name", name)
                        .queryParam("page", page.toString())
                        .queryParam("size", size.toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(20))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].name").exists())
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void save() throws Exception {
        VehicleBrand vehicleBrand = getOneVehicleBrand();
        String jsonString = JSON.toJSONString(vehicleBrand, SerializerFeature.DisableCircularReferenceDetect);
        Mockito.doReturn(vehicleBrand).when(this.vehicleBrandService).save(Mockito.any(VehicleBrand.class));
        MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.post(baseUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString);
        mockMvc.perform(postBuilder)
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(vehicleBrand.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(vehicleBrand.getName()))
                .andExpect(MockMvcResultMatchers.status().is(200));
        ArgumentCaptor<VehicleBrand> vehicleBrandArgumentCaptor = ArgumentCaptor.forClass(VehicleBrand.class);
        Mockito.verify(this.vehicleBrandService).save(vehicleBrandArgumentCaptor.capture());
        Assertions.assertEquals(vehicleBrand.getName(), vehicleBrandArgumentCaptor.getValue().getName());
    }

    @Test
    void update() throws Exception {
        Long id = new Random().nextLong();
        VehicleBrand oldVehicleBrand = getOneVehicleBrand();
        oldVehicleBrand.setId(id);
        VehicleBrand newVehicleBrand = getOneVehicleBrand();
        String jsonString = JSON.toJSONString(oldVehicleBrand, SerializerFeature.DisableCircularReferenceDetect);

        String url = baseUrl + "/" + id.toString();

        Mockito.doReturn(newVehicleBrand).when(this.vehicleBrandService).update(Mockito.anyLong(), Mockito.any(VehicleBrand.class));

        MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders
                .put(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString);

        this.mockMvc.perform(putRequest)
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newVehicleBrand.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(newVehicleBrand.getName()))
                .andExpect(status().isOk());

        ArgumentCaptor<VehicleBrand> vehicleBrandArgumentCaptor = ArgumentCaptor.forClass(VehicleBrand.class);
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.vehicleBrandService).update(longArgumentCaptor.capture(), vehicleBrandArgumentCaptor.capture());

        Assertions.assertEquals(oldVehicleBrand.getName(), vehicleBrandArgumentCaptor.getValue().getName());

    }

}