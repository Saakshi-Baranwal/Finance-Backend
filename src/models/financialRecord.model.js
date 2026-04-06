import mongoose from "mongoose";

const financialRecordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0
    },

    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
      index: true
    },

    category: {
      type: String,
      required: true,
      index: true
    },

    date: {
      type: Date,
      required: true,
      index: true
    },

    note: {
      type: String,
      trim: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);


financialRecordSchema.index({ type: 1, category: 1, date: -1 });

export const FinancialRecord = mongoose.model(
  "FinancialRecord",
  financialRecordSchema
);