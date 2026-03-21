import app from "./app.js";
import config from "./config/index.js";

const port = config.PORT

// Start the server
const server = () => {
    try {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        })
    } catch (error) {
        console.error("Error starting server:", error);
    }
};

server()