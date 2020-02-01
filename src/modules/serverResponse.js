class serverResponse {
    static successResponse(res, status, key, data) {
      return res.status(status).json({
        [key]: data,
      });
    }
   
    static notFoundError(req, res) {
      return res.status(404).json({
        errors: { message: 'Resource not found' },
      });
    }
   
    static errorResponse(res, status, error) {
      return res.status(status).json({
        errors: error,
      });
    }
   
    static serverErrorResponse(err, req, res) {
      return res.status(err.status || 500).json({
        errors: {
          message:
            'PremierLeague360 just experienced a little Shock',
        },
      });
    }
  }
   
  export default serverResponse;