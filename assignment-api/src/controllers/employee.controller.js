const employeeController = {};
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
const empService = require('../services/employee.service');
/**
 * @description
 * Function employeeController is a Entry point for all employees
 * @param req {Object} the request object
 * */

employeeController.getEmpList = async (req, res) => {
    try {
        let query = {};
        return await empService.getEmpList(query);
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }

};


employeeController.getPerformanceReviewsRequiredFeedback = async (req, res) => {
    try {
        let query = { review_assigned_to: req.params.empId, isCompleted: false };
        return await empService.getPerformanceReviewForFeedback(query);
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }

};

employeeController.submitReviewFeedback = async (body) => {
    try {
        return await empService.updateReviewData(body);
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }

};

employeeController.getEmployeeData = async (req, res) => {
    try {
        return await empService.getEmpData({ _id: req.params.empId });
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
};



module.exports = employeeController;
