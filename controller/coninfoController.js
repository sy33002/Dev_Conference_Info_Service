const { Conference, Sequelize } = require('../models'); // ../models/index.js

exports.index = (req, res) => {
    // index.ejs 랜더 (data 키로 session 객체의 userInfo 전달)
    res.render('index');
};
exports.getConferenceList = (req, res) => {
    res.render('event/list');
};
exports.getConferenceWrite = (req, res) => {
    res.render('event/write');
};
exports.getConferenceDetail = async (req, res) => {
    const { con_id } = req.params;
    const result = await Visitor.findOne({
        where: { con_id },
    });
    res.render('event/detail', { data: result });
};
