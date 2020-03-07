"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_tag_1 = __importDefault(require("graphql-tag"));
var schema = graphql_tag_1.default(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Query {\n    info: String!\n    links: [Link!]!\n    link(id: ID!): Link\n    feed(filter: String, skip: Int, first: Int): [Link!]!\n  }\n\n  type Mutation {\n    post(url: String!, description: String!): Link!\n    postLink(url: String!, description: String!): Link!\n    updateLink(id: ID!, url: String, description: String): Link\n    signup(email: String!, password: String!, name: String!): AuthPayload\n    login(email: String!, password: String!): AuthPayload\n  }\n\n  type Link {\n    id: ID!\n    description: String! @deprecated\n    desc: String!\n    url: String!\n    postedBy: User\n  }\n\n  type Subscription {\n    newLink: Link\n  }\n\n  type AuthPayload {\n    token: String\n    user: User\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n    links: [Link!]!\n  }\n"], ["\n  type Query {\n    info: String!\n    links: [Link!]!\n    link(id: ID!): Link\n    feed(filter: String, skip: Int, first: Int): [Link!]!\n  }\n\n  type Mutation {\n    post(url: String!, description: String!): Link!\n    postLink(url: String!, description: String!): Link!\n    updateLink(id: ID!, url: String, description: String): Link\n    signup(email: String!, password: String!, name: String!): AuthPayload\n    login(email: String!, password: String!): AuthPayload\n  }\n\n  type Link {\n    id: ID!\n    description: String! @deprecated\n    desc: String!\n    url: String!\n    postedBy: User\n  }\n\n  type Subscription {\n    newLink: Link\n  }\n\n  type AuthPayload {\n    token: String\n    user: User\n  }\n\n  type User {\n    id: ID!\n    name: String!\n    email: String!\n    links: [Link!]!\n  }\n"])));
exports.default = schema;
var templateObject_1;
//# sourceMappingURL=schema.gql.js.map