const Filter = require('badwords-ko'); // npm install badwords-ko --save
const filter = new Filter();

const { ConferenceReview, Sequelize } = require('../models'); // ../models/index.js
const { Op } = require('sequelize');

exports.getReview = async (req, res) => {
    const pageNum = req.query.page; // 페이지 번호
    const limit = 5; // 보여줄 리뷰 수
    const offset = 0 + (pageNum - 1) * limit; // 몇 번 부터 보여줄지
    try {
        const count = await ConferenceReview.count();
        const result = await ConferenceReview.findAll({
            offset: offset,
            limit: limit,
            order: [['re_id', 'DESC']],
        });
        res.render('review/list', { result: result, count: count });
        console.log(count);
    } catch (err) {
        console.log(err);
        res.send('Server Error');
    }
};

exports.postReview = async (req, res) => {
    console.log(req.body);
    const result = await ConferenceReview.create({
        con_id: 1,
        re_title: req.body.subject,
        re_content: filter.clean(req.body.content),
        re_date: Date.now(),
        user_id:
            req.session && req.session.userInfo
                ? req.session.userInfo.userId
                : '익명사용자',
    });
    res.send(result);
};

exports.deleteReview = async (req, res) => {
    const result = await ConferenceReview.destroy({
        where: { re_id: 1 },
    });
    res.send(true);
};

exports.getReviewWrite = (req, res) => {
    console.log(req.session);
    res.render('review/write');
};

exports.getReviewDetail = async (req, res) => {
    console.log(req.params);
    const result = await ConferenceReview.findOne({
        where: { re_id: req.params.id },
    });
    if (result) {
        await result.increment('re_count', { by: 1 });
    }
    res.render('review/detail', {
        review: result,
    });
    console.log(result);
};
