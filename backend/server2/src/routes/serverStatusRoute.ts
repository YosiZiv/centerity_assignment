import { Router } from "express";
import {
  getServerStatus,
  setServerStatus,
} from "../controllers/serverStatusController";

const router = Router();
router.get("/", getServerStatus);
router.post("/", setServerStatus);
export { router as serverStatusRouter };
