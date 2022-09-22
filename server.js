import koa from "koa";
import koaBody from "koa-body";
import mount from "koa-mount";
import {graphqlHTTP} from "koa-graphql";
//import express from 'express';
//import routesProd from './routes/routesProd.js';
//import routesCart from './routes/routesCart.js';
//import usuario from './routes/routesUser.js';
import { typeDef } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";
import {makeExecutableSchema} from "@graphql-tools/schema";

const app = new koa();

app.use(koaBody());

const schema = makeExecutableSchema({
    typeDefs: typeDef,
    resolvers: resolvers,
});

app.use(mount("/graphql",graphqlHTTP({
    schema:schema,
    graphiql:true
})))

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, ()=> console.log(`Servidor iniciado en el puerto ${PORT}`));
server.on('error',(error) => console.log(error));