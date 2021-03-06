exports.notFound = function(req, res, next) {
    const err = new Error('404 page not found');
    err.status = 404;
    next(err);
}

exports.catchAsync = function(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(err => next(err));
        }     
    }


exports.catchErrors = function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('error', {
        message: err.message
    });
}
