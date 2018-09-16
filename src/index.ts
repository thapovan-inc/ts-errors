// tslint:disable:max-classes-per-file

class BadArgumentException extends Error {

    public static badArgumentException: boolean = true;
    public fieldName?: string;
    constructor(message: string, fieldName?: string) {
        super(message);
        if (fieldName) {
            this.fieldName = fieldName;
        }
    }

    public toJSON(): object {
        return {message: this.message, field: this.fieldName};
    }
}

function isBadArgumentException(err: any): err is BadArgumentException {
    return (err) && (err.badArgumentException === true);
}

class AuthenticationException extends Error {
    public static authException: boolean = true;
    public metadata?: object;
    constructor(message: string, metadata?: object) {
        super(message);
        if (metadata) {
            this.metadata = metadata;
        }
    }

    public toJSON(): object {
        return {message: this.message, metadata: this.metadata};
    }
}

function isAuthenticationException(err: any): err is AuthenticationException {
    return (err) && (err.authException === true);
}

interface FieldError {
    fieldName: string;
    errors: string[];
}

class ValidationError extends Error {
    public static validationError: boolean = true;

    public fieldErrors: FieldError[];
    constructor(message: string, ...fieldErrors: FieldError[]) {
        super(message);
        this.fieldErrors = fieldErrors;
    }

    public toJSON(): object {
        return {message: this.message, fieldErrors: this.fieldErrors};
    }
}

function isValidationError(err: any): err is ValidationError {
    return (err) && (err.validationError === true);
}

class GenericError extends Error {
    public static serverError: boolean = true;

    public cause?: Error;
    constructor(cause?: Error, message?: string) {
        if (!message) {
            message = "Unknown error has occured";
        }
        super(message);
        this.cause = cause;
    }

    public toJSON(): object {
        return {message: this.message, cause: this.cause ? this.cause.message : "unknown"};
    }
}

function isGenericError(err: any): err is GenericError {
    return (err) && (err.serverError === true);
}

export {
    BadArgumentException,
    isBadArgumentException,
    AuthenticationException,
    isAuthenticationException,
    FieldError,
    ValidationError,
    isValidationError,
    GenericError,
    isGenericError,
};
