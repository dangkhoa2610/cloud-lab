const express = require("express");

const app = express();

// Câu 22: API GET /api/hello
app.get("/api/hello", (req, res) => {
    res.json({
        message: "Backend đang hoạt động!"
    });
});

// Câu 21: Server chạy port 5000
app.listen(5000, () => {
    console.log("Server chạy tại http://localhost:5000");
});
