const mongoose = require('mongoose')
const slugify = require("slugify");

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,

    },
    description:{
        type: String,
        minLength:[50, 'Minimo 50 caracteres'],
        maxLength: 300,
    },
    numberOfTopic:{
        type:Number,
        default: 0,
        min:0,
        max:100
    },
    publishedAt: {
        type: Date,
    },
    slug:{
        type:String,
        required: true,
    },
    videos:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Videos'
        }
    ]
})

CourseSchema.virtual('info')
    .get(function (){
        return `${this.description}. Temas: ${this.numberOfTopic}. Fecha de lanzamiento: ${this.publishedAt}}`
    })
    .set(function (value){

    })
/* Middleware
* validate
* save
* remove
* updateOne
* deleteOne
* init => sync
* */

CourseSchema.pre('validate', function (next){
    this.slug = slugify(this.title)
    next()
})

CourseSchema.virtual('videoss').get(function (){
    return mongoose.model('Video').find({course: this._id})
})

module.exports = mongoose.model('Course', CourseSchema)
