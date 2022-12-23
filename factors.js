const factors = (() => {
    const setup = ({
        text,
        submit,
        output,
    }) => {
        submit.addEventListener('click', (event) => {
            const n = text.valueAsNumber
            const factorList = calculate(n)

            output.replaceChildren(
                ...(factorList.map(x => {
                    const node = document.createElement('li')
                    node.innerText = x
                    return node
                }))
            )
        });
    }

    // Based on https://en.wikipedia.org/wiki/Wheel_factorization
    // TODO Look up more primes and generate appropriate `inc` array.

    const primes = [2, 3, 5]
    const nextPrime = 7

    const inc = [4, 2, 4, 2, 4, 6, 2, 6]

    const div = (n, k) => n % k == 0

    const calculate = (n) => {
        if (!(n > 1)) {
            // NaN goes here
            return [n]
        }
        let output = []
        
        for (prime of primes) {
            while (div(n, prime)) {
                output.push(prime)
                n /= prime
            }
        }
        let k = nextPrime
        let i = 0
        while (k * k <= n) {
            if (div(n, k)) {
                output.push(k)
                n /= k
            } else {
                k += inc[i]
                i += 1
                if (i >= inc.length) {
                    i = 0
                }
            }
        }
        if (n > 1) {
            output.push(n)
        }

        return output
    }

    return { setup, calculate }
})()

