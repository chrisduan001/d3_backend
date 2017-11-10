/**
 * Created by on 11/9/17.
 */
exports.errorModel = (errorCode, message) => {
    return {error: {errorCode, message}}
}