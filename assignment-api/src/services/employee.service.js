const employeeDao = require("../dao/employee.dao");
const performanceReviewDoa = require("../dao/performance-review.dao");

async function getEmpList(query = {}) {
    return await employeeDao.getEmployeesData(query);
}

async function getPerformanceReviewForFeedback(query) {
    return await performanceReviewDoa.getReviews(query);
}

async function updateReviewData(data) {
    let {_id, ...payload} =  data;
    let query = { _id }
    return await performanceReviewDoa.updateReview(query, payload);
}

async function getEmpData(query){
    return await employeeDao.getEmployeeData(query);
}

module.exports = {
    getEmpList,
    getPerformanceReviewForFeedback,
    updateReviewData,
    getEmpData
};
