const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/search", async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({
            error: "Search query is required"
        });
    }

    try {
        const response = await fetch(
            `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}`
        );

        const data = await response.json();

        res.json(data);
    } catch (error) {
        res.status(500).json({
            error: "Search failed"
        });
    }
});

app.listen(3000, () => {
    console.log("SkillGap AI server running on port 3000");
});
