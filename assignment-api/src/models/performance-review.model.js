const mongoose = require("mongoose");

const performanceReviewSchema = mongoose.Schema({
    description: { 
        type: String,
    },
	employee: {
        type: mongoose.Schema.Types.ObjectId, ref: 'employee'
    },
    review_assigned_to : {
        type: mongoose.Schema.Types.ObjectId, ref: 'employee'  
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("performanceReview", performanceReviewSchema);
