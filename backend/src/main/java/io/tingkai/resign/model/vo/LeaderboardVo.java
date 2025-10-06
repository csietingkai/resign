package io.tingkai.resign.model.vo;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import lombok.Data;

@Data
public class LeaderboardVo {

	private List<ByPoint> byPoints;

	private List<ByCoworker> byCoworkers;

	@Data
	public static class ByPoint {

		private UUID id;

		private String name;

		private Integer point;

		private Integer total;

		private BigDecimal progress;
	}

	@Data
	public static class ByCoworker {

		private UUID id;

		private String name;

		private Integer point;

	}
}
