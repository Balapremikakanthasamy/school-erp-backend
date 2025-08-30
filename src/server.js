import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRoutes from './routes/health.js';
import dbRoutes from './routes/dbRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import schoolRoutes from './routes/schoolRoutes.js';
import classroomRoutes from './routes/classroomRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';

dotenv.config();

const app = express();

// ✅ Middleware first
app.use(cors());
app.use(express.json());

// ✅ Routes after middleware
app.use('/api', healthRoutes);
app.use('/api/db', dbRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/schools', schoolRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/teachers', teacherRoutes);

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running 🚀' });
});

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
