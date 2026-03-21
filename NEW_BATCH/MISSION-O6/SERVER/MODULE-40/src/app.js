import express from "express";
const app = express();
// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies
app.use(express.json());
// Basic route
app.get('/', (req, res) => {
    res.send('Hello, TypeScript + Express!');
});
export default app;
