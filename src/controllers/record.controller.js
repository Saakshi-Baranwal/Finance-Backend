
import * as recordService from "../services/record.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const createRecord = async (req, res, next) => {
  try {
    const record = await recordService.create(req.body, req.user);

    res
      .status(201)
      .json(new ApiResponse(201, record, "Record created successfully"));
  } catch (err) {
    next(err);
  }
};

export const getRecords = async (req, res, next) => {
  try {
    const records = await recordService.getAll(req.query);

    res
      .status(200)
      .json(new ApiResponse(200, records, "Records fetched successfully"));
  } catch (err) {
    next(err);
  }
};

export const updateRecord = async (req, res, next) => {
  try {
    const record = await recordService.update(req.params.id, req.body);

    res
      .status(200)
      .json(new ApiResponse(200, record, "Record updated successfully"));
  } catch (err) {
    next(err);
  }
};

export const deleteRecord = async (req, res, next) => {
  try {
    await recordService.remove(req.params.id);

    res
      .status(200)
      .json(new ApiResponse(200, null, "Record deleted successfully"));
  } catch (err) {
    next(err);
  }
};