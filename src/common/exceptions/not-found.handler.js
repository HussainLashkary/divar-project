function NotFoundHandler(app) {
    app.use((req, res, next) => {
        res.status(404).json({
             message: "Not found" 
        });
    })
}

module.exports = NotFoundHandler