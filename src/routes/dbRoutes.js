import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Snapshot counts of records
router.get("/snapshot", async (req, res) => {
  try {
    const schools = await prisma.school.count();
    const teachers = await prisma.teacher.count();
    const classrooms = await prisma.classroom.count();
    const students = await prisma.student.count();
    res.json({ schools, teachers, classrooms, students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
