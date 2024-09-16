import { StatusCodes } from 'http-status-codes'

// const {StatusCode} = httpStatusCodes{StatusCode}
export const errorHandlingMiddelware = async(err, req, res, next) => {
    if (!err.statusCode)
        err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR

    const responseError = {
        statusCode: err.statusCode,
        message: err.message || StatusCodes[err.statusCode],
        stack: err.stack        //Stack la nhung doan bao loi chi tiet o dong so may, file nao,....
    }
    // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, còn không thì xóa đi. (Muốn hiểu rõ hơn hãy xem video 55 trong bộ MERN Stack trên kênh Youtube: https://www.youtube.com/@trungquandev)
    // if (BUILD_MODE !== 'dev') delete responseError.stack
    console.log(responseError)
    res.status(responseError.statusCode).json(responseError)
}