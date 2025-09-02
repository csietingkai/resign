package io.tingkai.resign.model.vo;

import io.tingkai.base.model.vo.Transformable;
import io.tingkai.resign.entity.Coworker;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class CoworkerVo extends Coworker implements Transformable<Coworker> {

	protected boolean deletable;
}
