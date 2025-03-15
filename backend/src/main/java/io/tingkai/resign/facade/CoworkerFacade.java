package io.tingkai.resign.facade;

import java.text.MessageFormat;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import io.tingkai.resign.constant.DatabaseConstant;
import io.tingkai.resign.constant.MessageConstant;
import io.tingkai.resign.dao.CoworkerDao;
import io.tingkai.resign.entity.Coworker;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class CoworkerFacade {

	@Autowired
	private CoworkerDao coworkerDao;

	public List<Coworker> queryAll() {
		List<Coworker> entities = coworkerDao.findAll();
		if (entities.size() == 0) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_COWORKER));
		}
		return entities;
	}

	public List<String> queryAllDept() {
		List<String> entities = coworkerDao.findAllDept();
		if (entities.size() == 0) {
			log.trace(MessageFormat.format(MessageConstant.QUERY_NO_DATA, DatabaseConstant.TABLE_COWORKER));
		}
		return entities;
	}
}
