const http = require("http");

const HOST = process.env.HOST ? process.env.HOST : "0.0.0.0";
const PORT = process.env.PORT ? process.env.PORT : 80;

const requestListener = async (req, res) => {
    const decodedUrl = decodeURI(req.url);
    // console.log(`${req.method} ${decodedUrl}`);

    if (!["GET", "POST"].includes(req.method)) {
        res.writeHead(405, "Method Not Allowed");
        res.end();
        return;
    }

    if (req.method === "GET") {
        res.end(decodedUrl);
        return;
    }

    if (req.method === "POST") {
        const data = await getData(req);
        res.end(data);
        return;
    }
};

async function getData(req) {
    const buffers = [];

    for await (const chunk of req) {
        buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();
    return data;
}

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});
