var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
       _ = require('lodash');
/**
 * Getter
 */
var escapeProperty = function(value) {
  return _.escape(value);
};

var ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        get: escapeProperty
    }, 
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    description: {
        type: String
    },
    img_name:{
        type: String,
    },
    created: {
        type: Date
    },
    updated: {
        type: Date
    },
});

/**
 * Virtuals
 */

ProductSchema.virtual('dateLocal').get(function() {
    return this.date.toString();
});

ProductSchema.pre('save', function(next) {
    var currentDate = new Date();
    this.updated = currentDate;
    if (!this.created)
        this.created = currentDate;
    next();
});

var product = mongoose.model('Product', ProductSchema);
module.exports = product;
