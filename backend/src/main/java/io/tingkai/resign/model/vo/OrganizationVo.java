package io.tingkai.resign.model.vo;

import io.tingkai.base.model.vo.Transformable;
import io.tingkai.resign.entity.Organization;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class OrganizationVo extends Organization implements Transformable<Organization> {

	protected boolean deletable;
}
