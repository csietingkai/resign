package io.tingkai.resign.model.vo;

import java.util.List;
import java.util.UUID;

import io.tingkai.resign.entity.Coworker;
import lombok.Data;

@Data
public class OrganizationCoworkerInfo {

	private UUID orgId;

	private String orgName;

	private List<Coworker> coworkers;
}
