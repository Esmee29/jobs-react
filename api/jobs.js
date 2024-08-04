import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'jobs.json');

export default async function handler(req, res) {
  const { method, query } = req;
  const { id } = query;

  try {
    const jsonData = await readFile(filePath, 'utf-8');
    let jobs = JSON.parse(jsonData);

    switch (method) {
      case 'GET':
        if (id) {
          const job = jobs.find(job => job.id === parseInt(id));
          if (job) {
            res.status(200).json(job);
          } else {
            res.status(404).json({ error: 'Job not found' });
          }
        } else {
          res.status(200).json(jobs);
        }
        break;

      case 'POST':
        const newJob = req.body;
        jobs.push(newJob);
        await writeFile(filePath, JSON.stringify(jobs, null, 2));
        res.status(201).json(newJob);
        break;

      case 'PUT':
        const updatedJob = req.body;
        jobs = jobs.map(job => (job.id === parseInt(id) ? updatedJob : job));
        await writeFile(filePath, JSON.stringify(jobs, null, 2));
        res.status(200).json(updatedJob);
        break;

      case 'DELETE':
        jobs = jobs.filter(job => job.id !== parseInt(id));
        await writeFile(filePath, JSON.stringify(jobs, null, 2));
        res.status(200).json({ message: 'Job deleted' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        res.status(405).json({ error: `Method ${method} not allowed` });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
}
