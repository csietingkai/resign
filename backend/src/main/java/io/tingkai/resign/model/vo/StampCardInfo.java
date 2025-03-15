package io.tingkai.resign.model.vo;

import java.util.List;
import java.util.UUID;

import io.tingkai.base.model.vo.Transformable;
import io.tingkai.resign.entity.StampCard;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class StampCardInfo extends StampCard implements Transformable<StampCard> {

	private List<ExtraInfo> extraInfos;

	@Data
	public static class ExtraInfo {
		private UUID recordId;
		private String recordDate;
	}
}
