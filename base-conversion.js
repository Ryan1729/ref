const baseConversion = (() => {
    const setup = ({
        source,
        target,
        input,
        output,
        submit,
        swap,
    }) => {
        swap.addEventListener('click', (event) => {
            const temp = source.valueAsNumber
            source.valueAsNumber = target.valueAsNumber
            target.valueAsNumber = temp

            input.value = output.value
            output.value = ''
        });

        submit.addEventListener('click', (event) => {
            let inputString = input.value

            if (inputString.toLowerCase().startsWith("0x")) {
                inputString = inputString.substring(2)
                source.valueAsNumber = 16
            }

            if (inputString.toLowerCase().startsWith("0b")) {
                inputString = inputString.substring(2)
                source.valueAsNumber = 2
            }

            if (inputString.toLowerCase().startsWith("0o")) {
                inputString = inputString.substring(2)
                source.valueAsNumber = 8
            }

            const sourceBase = source.valueAsNumber
            const targetBase = target.valueAsNumber

            const inputNumber = parseInt(inputString, sourceBase)

            const converted = inputNumber.toString(targetBase)

            const outputPrefix = targetBase === 16
                ? "0x"
                : targetBase === 2
                    ? "0b"
                    : targetBase === 8
                        ? "0o"
                        : ""

            output.value = outputPrefix + converted
        });
    }

    return { setup }
})()

