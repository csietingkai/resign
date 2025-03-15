package io.tingkai.resign.facade;

import java.text.MessageFormat;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.tingkai.base.model.exception.AlreadyExistException;
import io.tingkai.base.model.exception.FieldMissingException;
import io.tingkai.base.util.BaseAppUtil;
import io.tingkai.resign.constant.DatabaseConstant;
import io.tingkai.resign.constant.MessageConstant;
import io.tingkai.resign.dao.StampCardDao;
import io.tingkai.resign.entity.StampCard;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class StampCardFacade {

	@Autowired
	private StampCardDao stampCardDao;

	public StampCard queryByUserName(String userName) {
		Optional<StampCard> optional = stampCardDao.findByUserName(userName);
		if (optional.isEmpty()) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_STAMP_CARD));
			return null;
		}
		return optional.get();
	}

	public StampCard insert(StampCard entity) throws AlreadyExistException, FieldMissingException {
		if (!BaseAppUtil.isAllPresent(entity, entity.getUserName())) {
			throw new FieldMissingException();
		}

		Optional<StampCard> optional = stampCardDao.findByUserName(entity.getUserName());
		if (optional.isPresent()) {
			throw new AlreadyExistException();
		}

		return stampCardDao.save(entity);
	}

	public List<StampCard> queryTop(int size) {
		List<StampCard> cards = stampCardDao.findAllByOrderByPointDesc();
		if (cards.size() == 0) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_STAMP_CARD));
		}
		return cards.subList(0, Math.min(size, cards.size()));
	}
}
