/**
 * Created by on 11/8/17.
 */
exports.errorEntity = {
    userAuthError: {
        error: {
            errorCode: 800,
            message: "Incorrect password"
        }

    },

    saveUserError: {
        error: {
            errorCode: 801,
            message: "Unable to save user"
        }
    },

    serverError: {
        error: {
            errorCode: 901,
            message: "Server error"
        }
    },

    invalidTokenError: {
        error: {
            errorCode: 902,
            message: "Invalid token"
        }
    },

    expiredTokenError: {
        error: {
            errorCode: 903,
            message: "Token expired"
        }
    },

    //leaf chat
    userNameUsedError: {
        error: {
            errorCode: 1000,
            message: "User name has been used"
        }
    },

    passcodeError: {
        error: {
            errorCode: 1001,
            message: "Incorrect passcode"
        }
    }
};