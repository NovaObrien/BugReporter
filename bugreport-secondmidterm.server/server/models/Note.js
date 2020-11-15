import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Note = new Schema({
  content: {
    type: String,
    defualt: ''
  },

  reportedBy: {
    type: String,
    required: true
  },
  creatorId: {
    type: String,
    required: true,
    ref: 'Profile'
  },
  bugId: {
    type: String,
    required: true,
    ref: 'Bug'

  }
}, { timestamps: true, toJSON: { virtuals: true } })
Note.virtual('creator', {
  localField: 'creatorId',
  ref: 'Profile',
  foreignField: '_id',
  justOne: true
})

Note.virtual('bug', {
  localField: 'bugId',
  ref: 'Bug',
  foreignField: '_id',
  justOne: true
})

export default Note
