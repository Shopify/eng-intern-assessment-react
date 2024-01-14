import React from 'react'
import 'boxicons'

declare global {
    namespace JSX {
      interface IntrinsicElements {
        'box-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { name: string, type?:string, size?:string, color?:string } , HTMLElement>;
      }
    }
  }
  
 type iconProps = {
    name:string, 
    type?:string,
    size?:string, 
    color?:string
} 


/**
 * This is a component that returns the specified boxicon icon component.
 * @param {object} props - The properties passed to this component.
 * @param {string} props.name - The name of the icon to be rendered.
 * @param {string} [props.type=""] - The type of the icon. Optional.
 * @param {string} [props.size="md"] - The size of the icon. Optional. Defaults to "md".
 * @param {string} [props.color="#cacaca"] - The color of the icon. Optional. Defaults to "#cacaca".
 *
 * @returns A JSX element that displays an icon.
 *
 * The returned JSX element is a <box-icon> with the specified name, type, size, and color.
*/
export const Icon =(props: iconProps)=> {
    const {name, type= "", size="md", color="#cacaca"} = props;
    return <box-icon name={name} type={type} size= {size} color={color}/>
}