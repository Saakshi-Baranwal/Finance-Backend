
import { FinancialRecord } from "../models/financialRecord.model.js";
import { ApiError } from "../utils/ApiError.js";

// export const getSummary = async () => {
//   const data = await FinancialRecord.aggregate([
//     { $match: { isDeleted: false } },
//     {
//       $group: {
//         _id: "$type",
//         total: { $sum: "$amount" },
//       },
//     },
//   ]);

//   if (!data) {
//     throw new ApiError(500, "Failed to fetch summary");
//   }

//   let totalIncome = 0;
//   let totalExpense = 0;

//   data.forEach((item) => {
//     if (item._id === "income") totalIncome = item.total;
//     if (item._id === "expense") totalExpense = item.total;
//   });

//   return {
//     totalIncome,
//     totalExpense,
//     netBalance: totalIncome - totalExpense,
//   };
// };
export const getSummary = async () => {
  // Basic totals
  const totals = await FinancialRecord.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let totalIncome = 0;
  let totalExpense = 0;

  totals.forEach((item) => {
    if (item._id === "income") totalIncome = item.total;
    if (item._id === "expense") totalExpense = item.total;
  });

  // Category totals
  const categoryTotals = await FinancialRecord.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    },
    {
      $project: {
        category: "$_id",
        total: 1,
        _id: 0
      }
    }
  ]);

  // Recent activity
  const recentActivity = await FinancialRecord.find({
    isDeleted: false
  })
    .sort({ createdAt: -1 })
    .limit(5);

  // Monthly trends
  const monthlyTrends = await FinancialRecord.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" }
        },
        totalIncome: {
          $sum: {
            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
          }
        },
        totalExpense: {
          $sum: {
            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
          }
        }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 }
    }
  ]);

  return {
    totalIncome,
    totalExpense,
    netBalance: totalIncome - totalExpense,
    categoryTotals,
    recentActivity,
    monthlyTrends
  };
};