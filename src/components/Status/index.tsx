import React from 'react'

function characterParser(charCode: number) {
    const char = String.fromCharCode(charCode);
    // return this.characters[char] || char;
}

function characterColorDecoder(twoBytes: number) {
    const byteString = twoBytes.toString(16).padStart(4, '0');
    const firstByte = parseInt(byteString.slice(0, 2), 16);
    const secondByte = parseInt(byteString.slice(2), 16);

    // return {
    //     color: this.colors[firstByte],
    //     character: this.characterParser(secondByte)
    // };
}

// Object.fromEntries polyfill
//https://github.com/tc39/proposal-object-from-entries/blob/master/polyfill.js
function ObjectFromEntries(iter: any[]) {
    const obj = {};

    for (const pair of iter) {
        if (Object(pair) !== pair) {
            throw new TypeError("iterable for fromEntries should yield objects");
        }

        // Consistency with Map: contract is that entry has "0" and "1" keys, not
        // that it is an array or iterable.

        const { "0": key, "1": val } = pair;

        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            writable: true,
            value: val
        });
    }

    return obj;
}

function parseStatusChars(chars: string) {
    // return this.ObjectFromEntries(
    //   Object.entries(chars).map(entry => [
    //     entry[0],
    //     this.characterColorDecoder(entry[1])
    //   ])
    // );
}

function coloredCharacter({ character, color }: { character: string, color: string }) {
    return `<span style="color: ${color}">${character}</span>`;
}

function handleNewData(charConfig: any) {
    // const config = this.parseStatusChars(charConfig);

    // return status => {
    //     const statusProperties = ["on", "ready", "remote", "positive", "ramp"];
    //     const falseProperties = ["off", "tripped", "remote", "negative", "dc"];

    //     const textStatus = statusProperties.reduce(
    //         (accumulator, property, index) => {
    //             let output;

    //             if (status[property] === true) {
    //                 output = config[property];
    //             } else if (status[property] === false) {
    //                 output = config[falseProperties[index]];
    //             } else {
    //                 return accumulator;
    //             }

    //             return (accumulator += this.coloredCharacter(output));
    //         },
    //         ""
    //     );

    //     this.htmlOutput = textStatus;
    //     if (this.container) {
    //         this.container.innerHTML = textStatus;
    //     }
    //     return textStatus;
    // };
}

type RowProps = {
    name: string;
    request: string;
    description: string;
    originalSetting?: string | number;
    currentSetting?: string | number;
    reading?: string | number;
    units?: string | number;
    status?: string;
    addRequest(newRequest: string): void;
}

const ParamStatus: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
    return (
        <div>
            {props.children}
        </div>
    )
}

export default ParamStatus;
