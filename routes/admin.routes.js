import { createAdmin } from "../controllers/admin.controller";


export const adminRoute = (app) => {

    // Create Admin API ("DONE")
    app.post('/api/admin-create', createAdmin);
}