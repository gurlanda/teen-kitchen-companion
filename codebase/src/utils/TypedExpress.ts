// Author credit: Tomas Nilsson
// Original repo: https://github.com/tomnil/typedexpress
// Explainer article: https://javascript.plainenglish.io/typed-express-request-and-response-with-typescript-7277aea028c
import Express from 'express';
import { Query, Send } from 'express-serve-static-core';
import ResponseData from '../Storables/ResponseData';
import StorableUser from '../Storables/StorableUser';

export interface TypedRequest<QueryType extends Query = {}, BodyType = {}>
  extends Express.Request {
  body: BodyType;
  query: QueryType;
}

export interface TypedResponse<Payload> extends Express.Response {
  json: Send<ResponseData<Payload>, this>;
  locals: {
    loggedIn: boolean;
    sessionId: string | null;
    user: StorableUser | null;
  };
}
