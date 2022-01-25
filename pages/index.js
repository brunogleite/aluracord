import appConfig from "../config.json";

import {  TextField } from "@skynexui/components"

function GlobalStyle(){
    return(
        <style global jsx>{`
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                list-style: none
            }

            body{
                font-family: "Open Sans", sans-serif
            }

            html, body, #__next{
                min-height: 100vh;
                display: flex;
                flex: 1;
            }

            #__next{
                flex: 1;
            }

            #__next > * {
                flex: 1;
            }
        
        `}</style>
    )
}


function Title(props){
    console.log(props)
    const Tag = props.tag
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag}{
                    color: ${appConfig.theme.colors.primary["500"]};
                    font-size: 28px
                }
            `}</style>
            
        </>
        
    )
}


function HomePage() {
    return(
        <div>
            <GlobalStyle />
            <Title tag="h2">Boas</Title>
            <h2>Aluracord - Alura Matrix</h2>
            <TextField />
        </div>
    ) 
  }
  
  export default HomePage
  