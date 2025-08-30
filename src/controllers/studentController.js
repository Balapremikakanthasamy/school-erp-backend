import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createStudent = async (req, res) => {
  try {
    const { name, admissionNo, schoolId, classroomId } = req.body;
    const student = await prisma.student.create({
      data: { name, admissionNo, schoolId, classroomId },
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { school: true, classroom: true },
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: Number(req.params.id) },
      include: { school: true, classroom: true },
    });
    if (!student) return res.status(404).json({ error: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { name, admissionNo, schoolId, classroomId } = req.body;
    const student = await prisma.student.update({
      where: { id: Number(req.params.id) },
      data: { name, admissionNo, schoolId, classroomId },
    });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await prisma.student.delete({ where: { id: Number(req.params.id) } });
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
