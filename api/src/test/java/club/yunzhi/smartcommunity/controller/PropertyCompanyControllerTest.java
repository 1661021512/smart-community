package club.yunzhi.smartcommunity.controller;

import club.yunzhi.smartcommunity.entity.*;
import club.yunzhi.smartcommunity.service.PropertyCompanyService;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


class PropertyCompanyControllerTest extends ControllerTest{
    private final static Logger logger = LoggerFactory.getLogger(PropertyCompanyControllerTest.class);
    private final String baseUrl = "/propertyCompany";

    @MockBean
    PropertyCompanyService propertyCompanyService;

    public static PropertyCompany getOnePropertyCompany() {
        PropertyCompany propertyCompany = new PropertyCompany();
        Village village = VillageControllerTest.getOneVillage();

        logger.debug("构造一个乡镇");
        Town town = TownControllerTest.getOneTown();

        village.getParent().setParent(town);

        List<Village> villages = new ArrayList<>();
        villages.add(village);
        propertyCompany.setName(new Random().toString());
        propertyCompany.setVillages(villages);
        propertyCompany.setPhone(new Random().toString());
        propertyCompany.setContacts(new Random().toString());
        propertyCompany.setLegalPerson(new Random().toString());
        propertyCompany.setScore(new Random().nextInt());
        propertyCompany.setTimelyResponseRate(new Random().nextInt());
        return propertyCompany;
    }

    @Test
    void delete() throws Exception {
        Long id = new Random().nextLong();

        String url = baseUrl + "/" + id.toString();

        mockMvc.perform(MockMvcRequestBuilders.delete(url))
                .andExpect(MockMvcResultMatchers.status().is(200));

        // 断言调用方法符合预期
        ArgumentCaptor<Long> IntegerArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.propertyCompanyService).delete(IntegerArgumentCaptor.capture());
        Assertions.assertEquals(IntegerArgumentCaptor.getValue(), id);
    }

    @Test
    void getById() throws Exception {
        Long id = new Random().nextLong();

        String url = baseUrl + "/" + id.toString();

        logger.debug("构造返回的propertyCompany实体");
        PropertyCompany propertyCompany = getOnePropertyCompany();

        Mockito.doReturn(propertyCompany).when(this.propertyCompanyService).getById(Mockito.anyLong());

        logger.debug("模拟前台发起请求");
        mockMvc.perform(MockMvcRequestBuilders.get(url))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(propertyCompany.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(propertyCompany.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.legalPerson").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.contacts").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.phone").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.timelyResponseRate").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.score").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.villages").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.address").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.alternateContact").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.alternatePhone").exists())
                .andExpect(MockMvcResultMatchers.status().is(200));
    }

    @Test
    void page() throws Exception {
        String url = baseUrl + "/page";

        Integer page = Math.abs(new Random().nextInt());
        Integer size = Math.abs(new Random().nextInt() % 2000);
        List<PropertyCompany> propertyCompanies = new ArrayList<>();
        String name = new RandomString().nextString();

        for (int i = 0; i < 20; i++) {
            PropertyCompany propertyCompany = getOnePropertyCompany();
            propertyCompany.setId(new Random().nextLong());
            propertyCompanies.add(propertyCompany);
        }

        Page<PropertyCompany> propertyCompanyPage = new PageImpl<>(propertyCompanies);

        Mockito.doReturn(propertyCompanyPage).when(this.propertyCompanyService)
                .page(Mockito.anyString(),
                        Mockito.any(Pageable.class));

        mockMvc.perform(MockMvcRequestBuilders.get(url)
                        .queryParam("name", name)
                        .queryParam("page", page.toString())
                        .queryParam("size", size.toString()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()").value(20))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].name").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].legalPerson").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].contacts").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].phone").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].timelyResponseRate").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].score").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].villages").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].address").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].alternateContact").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content[0].alternatePhone").exists())
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void save()  throws Exception{
        //构造propertyCompany实体（待保存数据）
        PropertyCompany propertyCompany = getOnePropertyCompany();
        String jsonString = JSON.toJSONString(propertyCompany, SerializerFeature.DisableCircularReferenceDetect);
        Mockito.doReturn(propertyCompany).when(this.propertyCompanyService).save(Mockito.any(PropertyCompany.class));
        MockHttpServletRequestBuilder postBuilder = MockMvcRequestBuilders.post(baseUrl)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString);
        mockMvc.perform(postBuilder)
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(propertyCompany.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(propertyCompany.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phone").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.contacts").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.legalPerson").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.score").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.timelyResponseRate").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.villages").exists())
                .andExpect(MockMvcResultMatchers.status().is(200));
        ArgumentCaptor<PropertyCompany> propertyCompanyArgumentCaptor = ArgumentCaptor.forClass(PropertyCompany.class);
        Mockito.verify(this.propertyCompanyService).save(propertyCompanyArgumentCaptor.capture());
        Assertions.assertEquals(propertyCompany.getName(), propertyCompanyArgumentCaptor.getValue().getName());
        Assertions.assertEquals(propertyCompany.getContacts(), propertyCompanyArgumentCaptor.getValue().getContacts());
        Assertions.assertEquals(propertyCompany.getPhone(), propertyCompanyArgumentCaptor.getValue().getPhone());
        Assertions.assertEquals(propertyCompany.getLegalPerson(), propertyCompanyArgumentCaptor.getValue().getLegalPerson());
        Assertions.assertEquals(propertyCompany.getScore(), propertyCompanyArgumentCaptor.getValue().getScore());
        Assertions.assertEquals(propertyCompany.getTimelyResponseRate(), propertyCompanyArgumentCaptor.getValue().getTimelyResponseRate());
        Assertions.assertEquals(propertyCompany.getVillages(), propertyCompanyArgumentCaptor.getValue().getVillages());

    }

    @Test
    void update() throws Exception {
        Long id = new Random().nextLong();
        PropertyCompany oldPropertyCompany = getOnePropertyCompany();
        oldPropertyCompany.setId(id);
        PropertyCompany newPropertyCompany = getOnePropertyCompany();
        String jsonString = JSON.toJSONString(oldPropertyCompany,SerializerFeature.DisableCircularReferenceDetect);

        String url = baseUrl + "/" + id.toString();

        Mockito.doReturn(newPropertyCompany).when(this.propertyCompanyService).update(Mockito.anyLong(), Mockito.any(PropertyCompany.class));

        MockHttpServletRequestBuilder putRequest = MockMvcRequestBuilders
                .put(url)
                .contentType(MediaType.APPLICATION_JSON)
                .content(jsonString);

        this.mockMvc.perform(putRequest)
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(newPropertyCompany.getId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(newPropertyCompany.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phone").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.contacts").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.legalPerson").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.score").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.timelyResponseRate").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.villages").exists())
                .andExpect(status().isOk());

        ArgumentCaptor<PropertyCompany> propertyCompanyArgumentCaptor = ArgumentCaptor.forClass(PropertyCompany.class);
        ArgumentCaptor<Long> longArgumentCaptor = ArgumentCaptor.forClass(Long.class);
        Mockito.verify(this.propertyCompanyService).update(longArgumentCaptor.capture(), propertyCompanyArgumentCaptor.capture());
        Assertions.assertEquals(oldPropertyCompany.getName(), propertyCompanyArgumentCaptor.getValue().getName());
        Assertions.assertEquals(oldPropertyCompany.getContacts(), propertyCompanyArgumentCaptor.getValue().getContacts());
        Assertions.assertEquals(oldPropertyCompany.getPhone(), propertyCompanyArgumentCaptor.getValue().getPhone());
        Assertions.assertEquals(oldPropertyCompany.getLegalPerson(), propertyCompanyArgumentCaptor.getValue().getLegalPerson());
        Assertions.assertEquals(oldPropertyCompany.getScore(), propertyCompanyArgumentCaptor.getValue().getScore());
        Assertions.assertEquals(oldPropertyCompany.getTimelyResponseRate(), propertyCompanyArgumentCaptor.getValue().getTimelyResponseRate());
        Assertions.assertEquals(oldPropertyCompany.getVillages(), propertyCompanyArgumentCaptor.getValue().getVillages());}
}