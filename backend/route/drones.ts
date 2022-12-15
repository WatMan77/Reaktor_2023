import { Request, Response } from "express";
import { Router } from "express";

const router: Router = Router();

// This is the basic function to receive the drones within the 500x500 squre meter area
router.get('/drones', async (req, res) => {

})

export { router as drones }