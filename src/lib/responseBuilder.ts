// This is a response builder class

export class ResponseBuilder {
    private _status: number;
    private _body: object;

    constructor(msg: object = {}) {
        this._status = 200;
        this._body = msg;
    }

    static create(msg: object = {}): ResponseBuilder {
        return new ResponseBuilder(msg);
    }

    status(status: number): ResponseBuilder {
        this._status = status;
        return this;
    }

    body(body: object): ResponseBuilder {
        this._body = body;
        return this;
    }

    message(msg: string): ResponseBuilder {
        this._body = { ...this._body, message: msg };
        return this;
    }

    build(): Response {
        return new Response(JSON.stringify(this._body), {
            status: this._status,
            headers: { "Content-Type": "application/json" },
        });
    }
}
