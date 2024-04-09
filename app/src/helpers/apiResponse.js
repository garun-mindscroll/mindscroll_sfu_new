exports.successResponse = function (res, msg) {
	var data = {
		status: 1,
		message: msg
	};
	return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data,base_url) {
	var resData = {
		status: 1,
		message: msg,
		base_url: base_url,
		data: data
	};
	return res.status(200).json(resData);
};

exports.successResponseWithValidationFailData = function (res, msg, data,count) {
        var resData = {
                status: 0,
                message: msg,
                count: count,
                data: data
        };
        return res.status(200).json(resData);
};


exports.UserExceptionResponse = function (res, msg) {
        var resData = {
                status: 5,
                message: msg
        };
        return res.status(200).json(resData);
};

exports.UserOTPNotVerifyedResponse = function (res, msg) {
        var resData = {
                status: 4,
                message: msg
        };
        return res.status(200).json(resData);
};


exports.ErrorResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg
	};
	return res.status(200).json(data);
};

exports.ErrorResponseWithException = function (res, msg) {
	var data = {
		status: 0,
		message: msg
	};
	return res.status(400).json(data);
};


exports.ErrorResponseWithData = function (res, msg, data) {
	var resData = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

exports.notFoundResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
	var resData = {
		status: 0,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

exports.validationError = function (res, msg) {
	var resData = {
		status: 0,
		message: msg
	};
	return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
	var data = {
		status: 0,
		message: msg,
	};
	return res.status(401).json(data);
};
