import React from 'react'
import 'boxicons'

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'box-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string, type?:string, size?:string } , HTMLElement>;
      }
    }
  }
  
 type iconProps = {
    name:string, 
    type?:string
} 

export const Icon =(props: iconProps)=> {
    const {name, type= ""} = props;
    return <box-icon name={name} type={type} size= {"md"}/>
}