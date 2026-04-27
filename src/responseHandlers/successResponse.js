
export const successResponse = (res, statusCode, status, message, data = {}, token) => {
    res.status(statusCode).json({
        status,
        message,
        data,
        token
    })
}