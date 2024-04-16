exports.responseHandler = (res,{code,message},data)=>{
    return (
        res
        .status(code)
        .json({
            message,
            data
        })
    )
}