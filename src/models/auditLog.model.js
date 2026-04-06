
import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true // CREATE, UPDATE, DELETE
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    entity: {
      type: String // "FinancialRecord", "User"
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId
    },

    metadata: {
      type: Object
    }
  },
  { timestamps: true }
);

export const AuditLog = mongoose.model("AuditLog", auditLogSchema);