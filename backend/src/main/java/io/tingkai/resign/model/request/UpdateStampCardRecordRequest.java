package io.tingkai.resign.model.request;

import java.util.UUID;

import io.tingkai.resign.entity.StampCardRecord;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class UpdateStampCardRecordRequest extends InsertStampCardRecordRequest {
	protected UUID id;

	public StampCardRecord toEntity() {
		StampCardRecord entity = super.toEntity();
		entity.setId(id);
		return entity;
	}
}
