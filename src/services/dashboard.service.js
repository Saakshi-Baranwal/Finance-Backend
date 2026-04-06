
import { FinancialRecord } from "../models/financialRecord.model.js";
import { ApiError } from "../utils/ApiError.js";

export const getSummary = async () => {
  const data = await FinancialRecord.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  if (!data) {
    throw new ApiError(500, "Failed to fetch summary");
  }

  let totalIncome = 0;
  let totalExpense = 0;

  data.forEach((item) => {
    if (item._id === "income") totalIncome = item.total;
    if (item._id === "expense") totalExpense = item.total;
  });

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
  };
};