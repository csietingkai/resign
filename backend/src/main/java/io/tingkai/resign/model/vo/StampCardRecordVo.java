package io.tingkai.resign.model.vo;

import java.util.UUID;

import io.tingkai.base.model.vo.Transformable;
import io.tingkai.resign.entity.StampCardRecord;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class StampCardRecordVo extends StampCardRecord implements Transformable<StampCardRecord> {

	protected UUID organizationId;

	protected String organizationName;

	protected String coworkerName;
}
