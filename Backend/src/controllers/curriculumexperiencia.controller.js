const db = require('../models');
const CurriculumExperiencia = db.CurriculumExperiencia;

exports.findAll = async (req, res, next) => {
  try {
    const data = await CurriculumExperiencia.findAll();
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const data = await CurriculumExperiencia.findByPk(req.params.id);
    if (!data) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = await CurriculumExperiencia.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const [updated] = await CurriculumExperiencia.update(req.body, { where: { id: req.params.id } });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    const updatedData = await CurriculumExperiencia.findByPk(req.params.id);
    res.status(200).json(updatedData);
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const deleted = await CurriculumExperiencia.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
