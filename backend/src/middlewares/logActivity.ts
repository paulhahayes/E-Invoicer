// insde authenticated routes - log user activity

// the table might be something like

// log=  { logId(primaryKey) | userId | activity | status}

// log status can be appened at the end of a function
// import { db } from '../config/firebase';

import { Response, Request, NextFunction } from 'express';

async function logActivity(req: Request, res: Response, next: NextFunction) {
  // connect to do
  // const logs = db.collection('logs');
  // const logId = logs.count();
  // const userId = (req as any).user;
  // const activity = req;
  // const status = req.statusCode;
  // const log = {
  //   logId,
  //   userId,
  //   activity,
  //   status,
  // };
  // console.log(log);
}

export default logActivity;
