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
            const sourceBase = source.valueAsNumber
            const targetBase = target.valueAsNumber

            const inputString = input.value

            // TODO handle 0x, 0b prefixes in input by setting the source base automatically on submit

            const inputNumber = parseInt(inputString, sourceBase)

            const converted = inputNumber.toString(targetBase)

            const prefix = targetBase === 16
                ? "0x"
                : targetBase === 2
                    ? "0b"
                    : ""

            output.value = prefix + converted
        });
    }

    return { setup }
})()

