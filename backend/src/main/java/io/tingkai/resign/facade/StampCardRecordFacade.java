package io.tingkai.resign.facade;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
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

	public StampCardRecord insert(StampCardRecord entity) throws FieldMissingException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getCardId(), entity.getCoworkerId(), entity.getDate(), entity.getPoint())) {
			throw new FieldMissingException();
		}
		return stampCardRecordDao.save(entity);
	}

}
