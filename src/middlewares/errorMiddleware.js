export const errorMiddleware = (err, req, res, next) => {
    console.log(err.message);

    res.json({
        status: false,
        message : err.message
    });
}