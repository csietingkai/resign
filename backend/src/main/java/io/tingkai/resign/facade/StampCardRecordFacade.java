package io.tingkai.resign.facade;

import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.util.BaseAppUtil;
import io.tingkai.resign.constant.DatabaseConstant;
import io.tingkai.resign.constant.MessageConstant;
import io.tingkai.resign.dao.StampCardRecordDao;
import io.tingkai.resign.entity.StampCardRecord;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StampCardRecordFacade {

	@Autowired
	private StampCardRecordDao stampCardRecordDao;

	public StampCardRecord queryById(UUID id) {
		Optional<StampCardRecord> optional = stampCardRecordDao.findById(id);
		if (optional.isEmpty()) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_STAMP_CARD_RECORD));
			return null;
		}
		return optional.get();
	}

	public List<StampCardRecord> queryByCardId(UUID cardId) {
		List<StampCardRecord> entities = stampCardRecordDao.findByCardId(cardId);
		if (entities.size() == 0) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_STAMP_CARD_RECORD));
		}
		return entities;
	}

	public List<StampCardRecord> queryByDateAndcoWorkerId(@Nullable LocalDate startDate, @Nullable LocalDate endDate, @Nullable UUID coworkerId) {
		List<StampCardRecord> entities = stampCardRecordDao.findAll();
		// @formatter:off
		entities = entities.stream()
				.filter(x -> !BaseAppUtil.isPresent(startDate) || x.getDate().toLocalDate().compareTo(startDate) >= 0)
				.filter(x -> !BaseAppUtil.isPresent(endDate) || x.getDate().toLocalDate().compareTo(endDate) <= 0)
				.filter(x -> !BaseAppUtil.isPresent(coworkerId) || x.getCoworkerId().equals(coworkerId))
				.collect(Collectors.toList());
		// @formatter:on
		if (entities.size() == 0) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_STAMP_CARD_RECORD));
		}
		return entities;
	}

	public StampCardRecord insert(StampCardRecord entity) throws FieldMissingException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getCardId(), entity.getCoworkerId(), entity.getDate(), entity.getPoint())) {
			throw new FieldMissingException();
		}
		return stampCardRecordDao.save(entity);
	}

}
