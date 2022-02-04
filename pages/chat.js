import { Box, TextField, Text, Image, Button } from "@skynexui/components";
import { SendButtonSticker } from "../src/SendButtonSticker"
import appConfig from "../config.json";
import React from "react";
import Router, { useRouter } from "next/router";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://nsykalveawqhpnkbpusp.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzYyNTcyNiwiZXhwIjoxOTU5MjAxNzI2fQ.sQ7sofyPIBfuYGAkyYmzyyMNRkqS3M8BtX0lHpLOmu8"
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



function escutaFuncaoEmTempoReal(addMessage){
    supabase
    .from("chat-project")
    .on("INSERT", (response) => {
        addMessage(response.new)
    })
    .subscribe()
}


export default function chat() {
    const [mensagem, setMensagem] = React.useState("");
    const [listaMensagem, setListaMensagem] = React.useState([]);
    const roteamento = useRouter()
    const userLogged = roteamento.query.username

    React.useEffect(() => {
        supabase
            .from("chat-project")
            .select("*")
            .then(
                ({ data }) => {
                   setListaMensagem(data)
                }
            )

            escutaFuncaoEmTempoReal((newMessage) => {
               // handleNewMessage(newMessage)
            })
    }, [])

    function handleNewMessage(newMessage) {
        const mensagem = {
            from: userLogged,
            text: newMessage
        }


        supabase
            .from("chat-project")
            .insert([mensagem])
            .then(
                ({ data }) => {
                    console.log(data[0])
                    setListaMensagem([
                        ...listaMensagem,
                        data[0]
                    ])
                }
            )

        setMensagem("")
    }


    return (
        <Box styleSheet={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            backgroundColor: `${appConfig.theme.colors.neutrals[500]}`
        }}>
            
            <Box styleSheet={{
                minHeight: "80vh",
                maxWidth: "80vw",
                width: "100%",
                marginInline: "auto",
                backgroundColor: `${appConfig.theme.colors.neutrals[800]}`,
                padding: "18px 44px"
            }}>
                <Header/>
                <Box styleSheet={{
                    backgroundColor: `${appConfig.theme.colors.neutrals[700]}`,
                    width: "100%",
                    height: "60vh",
                    marginBottom: "12px",
                    overflowY: "scroll"
                }}>
                    <Message mensagens={listaMensagem} definir={setListaMensagem} />
                </Box>
                <Box styleSheet={
                    { display: "flex",
                    alignItems : "center"
                    }
                    }>
                    <TextField
                    styleSheet={ {width: "100%"} }
                        value={mensagem}
                        type="textarea"
                        placeholder="Escreva aqui a sua mensagem"
                        onChange={(e) => {
                            const message = e.target.value;
                            setMensagem(message)
                        }}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleNewMessage(mensagem)
                            }
                            }
                        } />
                        <SendButtonSticker 
                            onStickerClick={(sticker) => {
                                console.log("Salve esse sticker no banco", sticker)
                                handleNewMessage(":sticker:" + sticker)
                            }} />
                </Box>
                
            </Box>
        </Box >
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5' styleSheet={{color: "white"}}>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}


var today = new Date();

var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+ today.getFullYear();

function Message(props) {
    
    return (
        <Box tag="ul" styleSheet={{color: "white" }}>

            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: "5px",
                            padding: "16px",
                            marginBottom: "12px",
                            hover: {
                                backgroundColor: `${appConfig.theme.colors.neutrals[900]}`
                            }
                        }}>
                        <Box styleSheet={{
                            display: "flex",
                            alignItems: "center",
                        }}>
                            <Image
                                src={`https://github.com/${mensagem.from}.png`}
                                styleSheet={{
                                    borderRadius: "50%",
                                    width: "24px",
                                    height: "24px",
                                    marginRight: "6px"
                                }} />
                            <Text styleSheet={{ marginRight: "6px" }}>{mensagem.from}</Text>
                            <Text>{date}</Text>
                            <Box styleSheet={{
                                marginLeft: "auto", 
                                padding: "8px",
                                borderRadius : "6px",
                                hover:{
                                    backgroundColor: `${appConfig.theme.colors.neutrals[600]}`
                                },
                                cursor: "pointer"
                            }} 
                            onClick={()=>{
                                       
                                
                                        supabase
                                        .from('chat-project')
                                        .delete()
                                        .match({ id: mensagem.id }).then(() =>{
                                            let indice = props.mensagens.indexOf(mensagem);
                                            //1 parametro: Indice que vou manipular 
                                            //2 parametro: Quantidade de itens que seram manipulados a partir do primeiro paramentro 
                                            //3 parametro: Setar oq vc vai colocar no lugar (não obrigatório)
                                            props.mensagens.splice(indice,1)
                                            //... juntar um objeto/array com o outro
                                            props.definir([...props.mensagens])
                                        })
                                
                            }}>

                            clear</Box>
                        </Box>
                        {mensagem.text.startsWith(":sticker:") ? <Image styleSheet={{maxWidth: "100px" , minHeight: "100px"}} src={mensagem.text.replace(":sticker:", "")}/> : mensagem.text}
                    </Text>
                )
            })}

        </Box>
    )
}