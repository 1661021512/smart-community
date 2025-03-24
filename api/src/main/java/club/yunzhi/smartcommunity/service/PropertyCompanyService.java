package club.yunzhi.smartcommunity.service;

import club.yunzhi.smartcommunity.entity.PropertyCompany;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PropertyCompanyService {

    /**
     * 删除
     * @param id
     */
    void delete(Long id);

    /**
     * 根据Id获取物业公司
     */
    PropertyCompany getById(Long id);

    /**
     * 分页
     * @param name 名称
     * @param pageable
     * @return
     */
    Page<PropertyCompany> page(String name, Pageable pageable);

    /**
     * 新增物业公司
     * @param propertyCompany 物业公司
     * @return
     */
    PropertyCompany save(PropertyCompany propertyCompany);

    /**
     * 设置数据
     * @param propertyCompany 物业公司
     * @param newPropertyCompany 新物业公司
     */
    void setData(PropertyCompany propertyCompany, PropertyCompany newPropertyCompany);

    /**
     * 验证数据是否符合要求
     * @param propertyCompany 物业公司
     */
    void validateField(PropertyCompany propertyCompany);

    /**
     * 更新物业公司基础信息
     *
     * @param id
     * @param propertyCompany 物业公司
     * @return
     */
    PropertyCompany update(Long id, PropertyCompany propertyCompany);

    /**
     * 新增或编辑时设置综合分数的排名
     * 一个排名的变更会对所有实体的排名产生影响
     * 故对所有实体重新设置排名
     */
    void updateAllPropertyCompanyRanks();


}
