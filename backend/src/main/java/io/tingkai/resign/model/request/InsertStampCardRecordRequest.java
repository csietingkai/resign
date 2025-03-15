package io.tingkai.resign.model.request;

import java.time.LocalDate;
import java.util.UUID;

import io.tingkai.resign.entity.StampCardRecord;
import lombok.Data;

@Data
public class InsertStampCardRecordRequest {
	protected UUID id;
	protected UUID cardId;
	protected LocalDate date;
	protected UUID coworkerId;
	protected Integer point;
	protected String description;

	public StampCardRecord toEntity() {
		StampCardRecord entity = new StampCardRecord();
		entity.setId(id);
		entity.setCardId(cardId);
		entity.setDate(date.atStartOfDay());
		entity.setCoworkerId(coworkerId);
		entity.setPoint(point);
		entity.setDescription(description);
		return entity;
	}
}
