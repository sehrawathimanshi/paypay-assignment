const performanceReviewModel = require('../models/performance-review.model');

async function updateReview(query, data) {
    let options = { new: true, upsert: true };
    return await performanceReviewModel.findOneAndUpdate(query, data, options).exec();
}

async function getReviews(query, populate = { path: 'employee' }) {
    return await performanceReviewModel.find(query).populate(populate);
}

async function getReview(query) {
    return await performanceReviewModel.findOne(query).lean().exec();
}

async function addReview(payload) {
    const reviewData = new performanceReviewModel(payload);
    return await reviewData.save();
}

async function insertManyReviews(payload) {
    return await performanceReviewModel.insertMany(payload);
}

module.exports = {
    updateReview,
    getReviews,
    getReview,
    addReview,
    insertManyReviews
};