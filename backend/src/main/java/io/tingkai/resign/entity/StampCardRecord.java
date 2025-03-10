package io.tingkai.resign.entity;

import java.time.LocalDateTime;
import java.util.UUID;

import io.tingkai.resign.constant.DatabaseConstant;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = DatabaseConstant.TABLE_STAMP_CARD_RECORD)
public class StampCardRecord {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	protected UUID id;
	protected UUID cardId;
	protected LocalDateTime date;
	protected UUID coworkerId;
	protected Integer point = 1;
	protected String description;
}
