package club.yunzhi.smartcommunity.repository;

import club.yunzhi.smartcommunity.entity.Attachment;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface AttachmentRepository extends CrudRepository<Attachment, Long>, JpaSpecificationExecutor<Attachment> {
}
