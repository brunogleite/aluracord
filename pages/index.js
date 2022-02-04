import appConfig from "../config.json";
import React from "react";
import Router from "next/router";

import { Box, TextField, Image, Button , Text } from "@skynexui/components"




function Title(props){
    console.log(props)
    const Tag = props.tag
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag}{
                    color: white;
                    font-size: 24px
                }
            `}</style>
            
        </>
        
    )
}


function HomePage() {
    const [username , setUsername] = React.useState("");

    return(
        <div>
            <Box styleSheet={{
                width : "100vw",
                height: "100vh",
                display: "grid",
                placeContent: "center",
                backgroundColor: `${appConfig.theme.colors.primary["500"]}`
            }}>
            
            <Box styleSheet={{
                backgroundColor: "#212931",
                display: "flex",
                alignItems: "center",
                padding: "32px",
                borderRadius: "5px"
                
            }}>
                <Box
                as="form"
                styleSheet={{
                    marginRight: "118px",
                    width: "100%",
                    maxWidth: "318px",
                    textAlign: "center"
                }}
                
                onSubmit={function(event){
                event.preventDefault();
                Router.push("/chat?username=" + username)
                }}
                >

                    <Title tag="h2">Boas vindas de volta!</Title>
                    <Text styleSheet={{
                        fontSize: "14px",
                        color: "#9AA5B1",
                        marginBottom: "14px"
                    }}>Aluracord - Alura Matrix</Text>
                    <TextField styleSheet={{
                        marginTop: "14px"
                    }} 
                    value={username}
                    onChange={function(evento){
                        const value = evento.target.value;
                        const valueSplit = value.split("");
                        for(var i = 0 ; i < valueSplit.length; i++){
                            if(valueSplit.length >= 3){
                                {/*Component tem display none */}
                                const finalValue = valueSplit.join("");
                                console.log(finalValue)
                            }
                        }
                        setUsername(finalValue)
                    }}/>
                    <Button type="submit" styleSheet={{width: "100%" }} label="Entrar"></Button>

                </Box>
                
                <Box styleSheet={{
                    Width: "250px",
                    minHeight: "240px",
                    borderRadius: "5px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column"

                }}>
                    <Image src={`https://github.com/${username}.png`} styleSheet={{
                        marginBottom: "11px",
                        borderRadius: "50%"
                    }}/>
                    <Text styleSheet={{
                        marginTop: "11px",
                        color: "white",
                        marginTop: "auto"
                    }}>{username}</Text>
                </Box>
                
            </Box>
            

            </Box>
        </div>
    ) 
  }
  
  export default HomePage
  