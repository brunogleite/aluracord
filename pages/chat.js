import { Box, TextField, Text, Image } from "@skynexui/components";
import appConfig from "../config.json";
import React from "react";

export default function chat(){
    const [mensagem, setMensagem] = React.useState("");
    const [listaMensagem, setListaMensagem] = React.useState([]);
 
    {/*
        -O user precisa digital no textarea
        -o user clica enter
        -o user ve a mensagem aparecer

        --DEV--
        [x] - colocar uma funcao a observar mudancas na area do textarea
        [x] - configurar o botao enter para que limpe o estado 
        [] - e depois aparecer uma mensagem numa array
    
    */}

    return(
        <Box styleSheet={{
            width: "100vw",
            height: "100vh",
            display:"flex",
            alignItems:"center",
            backgroundColor: `${appConfig.theme.colors.neutrals[500]}`
        }}>
            <Box styleSheet={{
                minHeight: "80vh",
                maxWidth: "80vw",
                width: "100%",
                marginInline: "auto",
                backgroundColor : `${appConfig.theme.colors.neutrals[800]}`,
                padding:"18px 44px"
            }}>
                <Box styleSheet={{
                    backgroundColor: `${appConfig.theme.colors.neutrals[700]}`,
                    width: "100%",
                    height:"60vh",
                    marginBottom:"12px"
                }}>
                    <Message mensagem={mensagem}/>
                </Box>

                <TextField 
                value={mensagem}
                type="textarea" 
                placeholder="Escreva aqui a sua mensagem" 
                onChange={(e) => {
                    const message = e.target.value; 
                    setMensagem(message)
                }}
                onKeyPress={(e) => {
                    if(e.key === "Enter"){
                        e.preventDefault();
                        setMensagem("")
                    }
                }   
                } />
            </Box>
        </Box>
    )
}

function Message(props){

    const [username , setUsername] = React.useState("omariosouto");

    return(
        <>
            <Box styleSheet={{
                display : "flex",
                alignItems: "center"
            }}>
                <Image 
                src={`https://github.com/${username}.png`} 
                styleSheet={{
                    borderRadius: "50%",
                    width: "24px",
                    height: "24px",
                    marginRight: "6px"
                }} />
                <Text styleSheet={{marginRight: "6px"}}>{username}</Text>
                <Text>03/01/2022</Text>
            </Box>
            <Text>{props.mensagem}</Text>
        </>
    )
}