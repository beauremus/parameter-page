import React from 'react'
import PropTypes from 'prop-types'

function index(props: any) {
    const colors = props.colors || [
        "black",
        "blue",
        "green",
        "cyan",
        "red",
        "magenta",
        "yellow",
        "white"
    ];

    return (
        <div>

        </div>
    )
}

index.propTypes = {

}

export default index

// class ParamStatus {
//     constructor({ container, colors, characters }) {
//       this.container =
//         container || document.getElementById("param-status__container");
//       this.colors = colors || [
//         "black",
//         "blue",
//         "green",
//         "cyan",
//         "red",
//         "magenta",
//         "yellow",
//         "white"
//       ];
//       this.characters = characters || {};
//       this.htmlStatus = "";
//     }

//     get htmlOutput() {
//       return this.htmlStatus;
//     }

//     set htmlOutput(newHtml) {
//       this.htmlStatus = newHtml;
//     }

//     characterParser(charCode) {
//       const char = String.fromCharCode(charCode);
//       return this.characters[char] || char;
//     }

//     characterColorDecoder(twoBytes) {
//       const byteString = twoBytes.toString(16).padStart(4, 0);
//       const firstByte = parseInt(byteString.slice(0, 2), 16);
//       const secondByte = parseInt(byteString.slice(2), 16);

//       return {
//         color: this.colors[firstByte],
//         character: this.characterParser(secondByte)
//       };
//     }

//     // Object.fromEntries polyfill
//     //https://github.com/tc39/proposal-object-from-entries/blob/master/polyfill.js
//     parseStatusChars(chars) {
//       return Object.fromEntries(
//         Object.entries(chars).map(entry => [
//           entry[0],
//           this.characterColorDecoder(entry[1])
//         ])
//       );
//     }

//     coloredCharacter({ character, color }) {
//       return `<span style="color: ${color}">${character}</span>`;
//     }

//     handleNewData(charConfig) {
//       const config = this.parseStatusChars(charConfig);

//       return status => {
//         const statusProperties = ["on", "ready", "remote", "positive", "ramp"];
//         const falseProperties = ["off", "tripped", "remote", "negative", "dc"];

//         const textStatus = statusProperties.reduce(
//           (accumulator, property, index) => {
//             let output;

//             if (status[property] === true) {
//               output = config[property];
//             } else if (status[property] === false) {
//               output = config[falseProperties[index]];
//             } else {
//               return accumulator;
//             }

//             return (accumulator += this.coloredCharacter(output));
//           },
//           ""
//         );

//         this.htmlOutput = textStatus;
//         if (this.container) {
//           this.container.innerHTML = textStatus;
//         }
//         return textStatus;
//       };
//     }
//   }

//   export { ParamStatus };
