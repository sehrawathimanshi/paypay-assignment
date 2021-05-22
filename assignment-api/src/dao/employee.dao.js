const employeeModel = require("../models/employee.model");

async function updateEmployee(data) {
    let { _id, ...payload } = data;
    let query = {};
    query = { _id }
    let options = { new: true, upsert: true };
    return await employeeModel.findOneAndUpdate(query, payload, options).exec();
}

async function addEmployee(payload) {
    const employee = new employeeModel(payload);
    return await employee.save();
}

async function getEmployeeData(query, projection = {}) {
    return await employeeModel.findOne(query, projection).lean().exec();
}

async function getEmployeesData(query, projection = {}) {
    return await employeeModel.find(query, projection).lean().exec();
}

async function deleteEmployee(query) {
    return await employeeModel.remove(query).lean().exec();
}

module.exports = {
    updateEmployee,
    addEmployee,
    deleteEmployee,
    getEmployeeData,
    getEmployeesData
};