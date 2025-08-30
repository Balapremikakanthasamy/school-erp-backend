import express from "express";
import prisma from "../config/prisma.js";

const router = express.Router();

router.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "ok", db: "connected" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
