import express from 'express';
import { getTasks, createTask, updateTask, addComment, addAttachment } from '../controllers/taskController.js';

const router = express.Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.post('/:id/comments', addComment);
router.post('/:id/attachments', addAttachment);
export default router;
