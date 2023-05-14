import express from 'express';

const router = express.Router();

const sampleTasks = [
  {
    id: 1,
    title: 'Task 1',
    description: 'This is task 1',
    completed: false,
  },
  {
    id: 2,
    title: 'Task 2',
    description: 'This is task 2',
    completed: false,
  },
];
router.get('/', (_req, res) => {
  res.status(200).json(sampleTasks);
});

router.get('/:id', (_req, res) => {
  const task = sampleTasks.find((task) => task.id === Number(_req.params.id));
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

export default router;
