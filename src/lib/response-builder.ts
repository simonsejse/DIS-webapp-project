abstract class ResponseBuilder {
    protected _status: number; // This is not used in the response, but only for the actual status code
    protected _body: object;

    constructor(msg: object = {}) {
        this._status = 200;
        this._body = msg;
    }

    abstract build(): Response;

    status(status: number): this {
        this._status = status;
        return this;
    }

    body(body: object): this {
        this._body = body;
        return this;
    }

    message(msg: string): this {
        this._body = { ...this._body, message: msg };
        return this;
    }
}

export class SuccessResponseBuilder extends ResponseBuilder {
    static create(msg: object = {}): SuccessResponseBuilder {
        return new SuccessResponseBuilder(msg);
    }

    build(): Response {
        return new Response(JSON.stringify(this._body), {
            status: this._status,
            headers: { "Content-Type": "application/json" },
        });
    }
}

export class ErrorResponseBuilder extends ResponseBuilder {
    private _ismajor: boolean;

    constructor(msg: object = {}) {
        super(msg);
        this._ismajor = false;
    }

    static create(msg: object = {}): ErrorResponseBuilder {
        return new ErrorResponseBuilder(msg);
    }

    ismajor(ismajor: boolean): this {
        this._ismajor = ismajor;
        return this;
    }

    build(): Response {
        return new Response(
            JSON.stringify({ ...this._body, ismajor: this._ismajor }),
            {
                status: this._status,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}

export type ErrorResponse = {
    message?: string;
    ismajor?: boolean;
    body?: object; // simon tror den skal være der
};
