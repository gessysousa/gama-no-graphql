/* import { createServer } from "http"; //importar função do módulo http
import { readFile } from "fs"; //pra enviar um html usando writeHead é necessario processar o html com o modulo fs (sistema de arquivos)
import { resolve } from "path";
import { parse } from "querystring"; */

import express from "express";
//import cors from "cors";
import { ApolloServer } from "apollo-server-express";//gql função que trabalha com tamplate string
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";

const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.applyMiddleware({
    app,
    cors: {
        origin: "http://localhost:3000",
    },
    bodyParseConfig: true,
})

/* const server = express();
//server.use(cors());

server.get("/status", (_, response)=>{
    response.send({
        status: "Okay",
    });
}); //middor é um padrão de implementação que você consegue encaixar várias funções em sequência em um end point ou uma situação

const enableCors = cors({origin:"http://localhost:3000"});

server
    .options("/authenticate", enableCors)
    .post("/authenticate", enableCors, express.json(), (request, response) => {
        console.log(
            "E-Mail", request.body.email,
            "Senha", request.body.password
        );
        response.send({
            Okay: true,
        });
    }); */

/* const server = createServer((request, response) =>{ //callback para tratar as requisições que vão chegar
    switch(request.url){                            //roteamento quando se tem mais de uma forma de acessar o serviço de uma API
         case "/status": {//diz se a API tá funcionando, trata a resposta como um buffer
            response.writeHead(200, {
                "Content-Type": "application/json",
            });
            response.write(
                JSON.stringify({
                    status:"Okay!",
                })
            );//corpo de mensagem
            response.end();//finaliza o buffer
            break;
        } 
         case "/sign-in": {
            const path = resolve(__dirname, "./pages/sign-in.html");//caminho estático é necessário importar a função resolve do paht e usar __dirname, ele injeta para cada módulo  o diretório onde esse módulo está
            readFile(path, (error, file) =>{
                if (error){
                    response.writeHead(500, "Can't process HTML file.");
                    response.end();
                    return;
                }
                response.writeHead(200);
                response.write(file);
                response.end();
            });
            break;
        }

        case "/home":{
            const path = resolve(__dirname, "./pages/home.html");//caminho estático é necessário importar a função resolve do paht e usar __dirname, ele injeta para cada módulo  o diretório onde esse módulo está
            readFile(path, (error, file) =>{
                if (error){
                    response.writeHead(500, "Can't process HTML file.");
                    response.end();
                    return;
                }
                response.writeHead(200);
                response.write(file);
                response.end();
            });
            break;
        } 

        case "/authenticate":{
            let data = "";
            request.on("data", (chunk)  => {
                data += chunk;
            });
            request.on("end", () =>{
                const params = parse(data);
                 response.writeHead(301, {
                   Location: "/home",
                }); 
                response.end();
            })
            break;
        }
        default : {//qualquer coisa que não for status, dá erro 404
            response.writeHead(404, "Service not found.");
            response.end();
            
        }
    }                                               
}); */

//configurar porta e hostname, pq pode ser que tenha mais de uma aplicação rodando
//rodando mais de um server ao mesmo tempo
//pra rodar o teste colocar no console: SET PORT=3000 && npm run start
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;//objeto com as variaveis de ambiente
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";//|| verifica se o lado da esquerda é falso, se sim, retorna o lado da direita, no caso 8000

app.listen(PORT, HOSTNAME, () => { //função é executada assim que o server começa a escutar
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
});

/* server.listen(8000, "127.0.0.1", () => {
    console.log("Server is listening at http://127.0.0.1:8000");
}) */