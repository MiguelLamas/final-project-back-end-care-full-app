import pg from "pg";
import express, { Router } from "express";
import { query } from "../db/index.js";
import cors from "cors";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();
import {
  getAllReminders,
  createNewReminder,
  updateReminder,
  deleteReminderById,
} from "../models/remindersModels.js";

const reminderRouter = express.Router(cors(), jsonParser);

reminderRouter.get("/", async function (req, res) {
  const results = await getAllReminders();
  res.json({
    success: true,
    message: `Displaying all reminders`,
    payload: results,
  });
});

reminderRouter.post("/", async function (req, res) {
  const newReminder = req.body;
  const results = await createNewReminder(newReminder);
  res.json({
    success: true,
    message: `Created new reminder`,
    payload: results,
  });
});

reminderRouter.patch("/:id", async function (req, res) {
  const id = req.params.id;
  const updatedReminder = req.body
  const results = await updateReminder(id, updatedReminder);
  res.json({
    success: true,
    message: `Updated reminder with id ${id}`,
    payload: results,
});
});

reminderRouter.delete("/:id", async function (req, res) {
  const id = req.params.id
  const results = await deleteReminderById(id)
  res.json({
    success: true,
    message: `Deleted reminder with id ${id}`,
    payload: results,

  });
});


export default reminderRouter;
