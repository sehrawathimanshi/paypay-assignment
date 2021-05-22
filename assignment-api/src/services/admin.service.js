const performanceReviewDao = require('../dao/performance-review.dao');
const employeeDao = require("../dao/employee.dao");
var mongoose = require('mongoose');


async function getEmpList(query) {
    return await employeeDao.getEmployeesData(query);
}

async function deleteEmp(query){
    return await employeeDao.deleteEmployee(query);
}

async function createUpdateEmp(data) {
    return await employeeDao.updateEmployee(data);
}

async function updateReviewData(data) {
    let {_id, ...payload} =  data;
    let query = { _id }
    return await performanceReviewDao.updateReview(query, payload);
}

async function getReviewList(query = {}) {
    return await performanceReviewDao.getReviews(query);
}

async function createEmp(payload){
    return await employeeDao.addEmployee(payload);
}

async function createReview(payload){
    return await performanceReviewDao.addReview(payload);
}

async function assignReviewsToOthers(data){
    const allEmp = await employeeDao.getEmployeesData({_id:{ $ne: data.empId }});
    const payload = allEmp.map(emp=>{
        return {
            description: '',
            employee: mongoose.Types.ObjectId(data.empId) ,
            review_assigned_to: emp._id,
            isCompleted: false
        }
    });
    return await performanceReviewDao.insertManyReviews(payload);
}
module.exports = {
    getEmpList,
    deleteEmp,
    createUpdateEmp,
    updateReviewData,
    getReviewList,
    createEmp,
    createReview,
    assignReviewsToOthers
};