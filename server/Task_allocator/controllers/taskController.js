import Task from '../models/task.js';

import nodemailer from 'nodemailer';

// Function to send email to assignee
const sendEmail = async (assignee, taskDetails) => {
  const transporter = nodemailer.createTransport({
    // Setup your email transporter configuration here
  });

  const mailOptions = {
    from: 'your-email@example.com',
    to: assignee,
    subject: 'New Task Assigned',
    text: `A new task has been assigned to you.\n\nDetails:\nHeading: ${taskDetails.heading}\nDescription: ${taskDetails.description}\nAssignee: ${taskDetails.assignee}\nStatus: ${taskDetails.status}`
  };

  await transporter.sendMail(mailOptions);
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTask = async (req, res) => {
  const task = new Task(req.body);
  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    Object.assign(task, req.body);
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.comments.push(comment);
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const addAttachment = async (req, res) => {
  const { id } = req.params;
  const { attachment } = req.body;
  try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    task.attachments.push(attachment);
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};