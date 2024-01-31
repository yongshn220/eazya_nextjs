import { Schema, model, models } from 'mongoose'


const userFeedbackSchema = new Schema({
  content:   { type: String, required: true },
  createdAt:          { type: Date, required: true },
}, {toJSON: { virtuals: true}, toObject: { virtuals: true}})
userFeedbackSchema.virtual('id').get(function() {return this._id.toHexString()})

export const UserFeedbackModel = models.UserFeedback || model("UserFeedback", userFeedbackSchema)


export interface IUserFeedback {
  id?:        string;
  content:    string;
  createdAt:  string;
}
