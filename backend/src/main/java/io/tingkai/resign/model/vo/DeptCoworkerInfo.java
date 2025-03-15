package io.tingkai.resign.model.vo;

import java.util.List;

import io.tingkai.resign.entity.Coworker;
import lombok.Data;

@Data
public class DeptCoworkerInfo {

	private String dept;

	private List<Coworker> coworkers;
}
