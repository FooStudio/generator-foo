/**
 * Created by mendieta on 1/3/17.
 */

import {developers, designers, producers} from "../../config"


export default class Acknowledgements {

    static styles = [
        'background-color: #1c1f24'
        , 'color: white'
        , 'display: block'
        , 'line-height: 11px'
        , 'font-size: 11px'
    ].join(';');

    static show() {
        let consoleString = '%c Developed by Foo(Studio) http://foostudio.mx \n Coded by:';
        for (let developer of developers) {
            consoleString += `\n * ${developer.name} - ${developer.url}`
        }
        consoleString += '\n Designed by:';
        for (let designer of designers) {
            consoleString += `\n * ${designer.name} - ${designer.url}`
        }
        consoleString += '\n Produced by:';
        for (let producer of producers) {
            consoleString += `\n * ${producer.name}`
        }
        console.log(consoleString, Acknowledgements.styles);
    }
}
