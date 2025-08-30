import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createTeacher = async (req, res) => {
  try {
    const { name, subject, schoolId } = req.body;
    const teacher = await prisma.teacher.create({ data: { name, subject, schoolId } });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({ include: { school: true } });
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: Number(req.params.id) },
      include: { school: true },
    });
    if (!teacher) return res.status(404).json({ error: "Teacher not found" });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { name, subject, schoolId } = req.body;
    const teacher = await prisma.teacher.update({
      where: { id: Number(req.params.id) },
      data: { name, subject, schoolId },
    });
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    await prisma.teacher.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Teacher deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
