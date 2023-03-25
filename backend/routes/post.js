import {Router} from "router";
import { getAccessToRoute } from "../middlewares/auth/auth";

const router = Router();

router.post("/create", getAccessToRoute, createPost);

export default router;