package io.tingkai.resign.model.vo;

import io.tingkai.base.model.vo.Transformable;
import io.tingkai.resign.entity.StampCard;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class StampCardVo extends StampCard implements Transformable<StampCard> {

	private Integer maxStampCnt;
}
