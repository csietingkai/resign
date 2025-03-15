package io.tingkai.resign.entity;

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
@Table(name = DatabaseConstant.TABLE_STAMP_CARD)
public class StampCard {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	protected UUID id;
	protected String userName;
	protected Integer point = 0;
}
