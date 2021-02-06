import { Request, Response } from "express";
import {
  BadRequestError,
  Status,
  ServerStatus,
} from "@centerity-assignment/common";

const serverStatus: ServerStatus = {
  status: Math.random() >= 0.5 ? Status.Online : Status.Offline,
  priority: 3,
};

const getServerStatus = (req: Request, res: Response) =>
  serverStatus.status === Status.Online
    ? res.send({
        priority: serverStatus.priority,
        status: serverStatus.status,
      })
    : res.status(400).send({
        priority: serverStatus.priority,
        status: serverStatus.status,
      });
const setServerStatus = (req: Request, res: Response) => {
  const { status } = req.body;
  if (!(status in Status)) throw new BadRequestError("paramter are incorrect");
  serverStatus.status = status;
  return res.send({
    priority: serverStatus.priority,
    status: serverStatus.status,
  });
};
export { getServerStatus, setServerStatus };
