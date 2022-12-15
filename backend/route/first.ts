import { Request, Response } from "express";
import { Router } from "express";

export const router: Router = Router();

router.get('/moi', (req, res) => {
    res.send("Hello there!")
})