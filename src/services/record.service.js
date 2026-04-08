
import { FinancialRecord } from "../models/financialRecord.model.js";
import { ApiError } from "../utils/ApiError.js";

export const create = async (data, user) => {
  const createdBy =
    user.role === "admin" && data.userId
      ? data.userId
      : user.id;

  return FinancialRecord.create({
    ...data,
    createdBy,
  });
};

export const getAll = async (query) => {
  const filter = { isDeleted: false };

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  if (query.startDate && query.endDate) {
    filter.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate),
    };
  }

  const records = await FinancialRecord.find(filter).populate("createdBy");

  return records;
};

export const update = async (id, data) => {
  const record = await FinancialRecord.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return record;
};

export const remove = async (id) => {
  const record = await FinancialRecord.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  if (!record) {
    throw new ApiError(404, "Record not found");
  }

  return record;
};
