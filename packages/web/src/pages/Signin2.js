import React, { useState } from "react";

export default function SignIn(){
    const [email, setEmail] = useState("");
    const [password, setPassword]  = useState("");

    const handleSubmit = (event) =>{
        event.preventDefault();//método que eventos nativos tem para previnir que a gente execute o comportamento default do browser, nesse caso do form tentar fazer a requisição sozinho
        fetch("http://127.0.0.1:8000/authenticate" , {//api nativa dos browsers pra trabalhar com requisições
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                email,
                password
            })
        }).then((response) => response.json())
        .then((data) =>{
            console.log("Success", data);
        })
    };

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);

    return(
    <form onSubmit = {handleSubmit}>{/* <!-- métodos para enviar get e post. Get é inseguro pq fica na barra de endereço e todo mundo consegue ver --> */}
        <fieldset>{/* <!--fieldset é aonde se coloca os campos--> */}
            <label htmlFor="email">E-mail</label>
            <input 
                id="email"  
                type="email" 
                value={email}
                onChange={handleEmailChange}
                inputMode="email" 
                autoComplete="username"/>{/* <!-- clicar na label e deixar o input com foco, tem que deixar o for=id do input --> */}
        </fieldset>
        <fieldset>
            <label htmlFor="password">Senha</label>
            <input 
                id="password" 
                type="password"
                value={password} 
                onChange={handlePasswordChange}
                autoComplete="current-password"/>
        </fieldset>
        <button type="submit">Entrar</button>
    </form>
    )
}


/* <!DOCTYPE html>//documento original em html
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Entrar - Exemplo de Cliente/Servidor</title>
</head>
<body>
    <form action="/authenticate" method="POST"><!-- métodos para enviar get e post. Get é inseguro pq fica na barra de endereço e todo mundo consegue ver -->
        <fieldset><!--fieldset é aonde se coloca os campos-->
            <label for="email">E-mail</label>
            <input id="email" name="email" type="email" inputmode="email" autocomplete="username"/><!-- clicar na label e deixar o input com foco, tem que deixar o for=id do input -->
        </fieldset>
        <fieldset>
            <label for="password">Senha</label>
            <input id="password" name="password" type="password" autocomplete="current-password"/>
        </fieldset>
        <button type="submit">Entrar</button>
    </form>
</body>
</html> */