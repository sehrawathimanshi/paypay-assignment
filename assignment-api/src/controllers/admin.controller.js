const adminController = {};
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
const adminService = require('../services/admin.service');
const empService = require('../services/employee.service')

/**
 * @description
 * Function adminController is a Entry point for all user
 * @param req {Object} the request object
 * */

adminController.getEmpList = async (req) => {
    try {
        let query = {};
        return await adminService.getEmpList(query);
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
};


adminController.deleteEmp = async (req) => {
    try{
        let query = {_id: req.params.empId};
        return await adminService.deleteEmp(query);
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
    
};

adminController.createEmployee = async (req)=>{
    try{
        return await adminService.createEmp(req.body); 
    }catch(error){
        console.log(error)
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
    
}

adminController.createUpdateEmp = async (req) => {
    try{
        return await adminService.createUpdateEmp(req.body);
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
    
    
};

adminController.updateReview = async (req) => {
    try{
        return await adminService.updateReviewData(req.body);
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
};

adminController.createReview = async (req) => {
    try{
        return await adminService.createReview(req.body);
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
};

adminController.getReviewList = async (req) => {
    try{
        return await adminService.getReviewList({employee: req.params.empId, isCompleted: true});
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
};

adminController.getEmpDetails= async (req)=>{
    try{
        return await empService.getEmpData({_id: req.params.empId});
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
}

adminController.assignReviewsToOthers = async (req)=>{
    try{
        return await adminService.assignReviewsToOthers({empId: req.body.empId});
    }catch(error){
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
}

module.exports = adminController;