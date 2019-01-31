const x = 20 // some data of type a
const f = n => n * 2 // A function from a to b
const arr = Array.of(x) // The type lift
// JS has type lift sugar for arrays: [x]

//.map() applies the function f to the value x
// in the context of the array
const result = arr.map(f)

// In this case `Array` is the context and `x` is the value we're mapping over

const flatten = [].concat.apply([], [[1], [2, 3], [4]])

const compose = (...fns) => x => fns.reduceRight((y, f) => f(y), x)
const trace = label => value => (console.log(`${label}: ${value}`), value)


{
    const label = 'API call composition'
    //a => Promise(b)
    const getUserById = id =>
        id === 3
            ? Promise.resolve({ name: 'Kurt', role: 'Author' })
            : undefined

    //b => Promice(c)
    const hasPremission = ({ role }) =>
        Promise.resolve(role === 'Author')

    // Try to compose them. This will fail
    const authUser = compose(hasPremission, getUserById)
    authUser(3).then(trace(label)) // API call composition: false
}

{
    const composeM = chainMethod => (...ms) =>
        ms.reduce((f, g) => x => g(x)[chainMethod](f))

    const composePromises = composeM('then')

    const label = 'API call composition'

    //a => Promise(b)
    const getUserById = id =>
        id === 3
            ? Promise.resolve({ name: 'Kurt', role: 'Author' })
            : undefined

    //b => Promise(c)
    const hasPremission = ({ role }) => (
        Promise.resolve(role === 'Author')
    )
    // Compose the functions (this works!)
    const authUser = composePromises(hasPremission, getUserById)
    authUser(3).then(trace(label))
}

{
    const Id = value => ({
        // Functor mapping
        // Preserve the wrapping for .map() by
        // pasing the mapped value into the type lift:
        map: f => Id.of(f(value)),

        // Monad chaining
        // Discard one level of wrapping
        // by omitting the .of() type lift:
        chain: f => f(value),

        // Just a way to inspect the values:
        toString: () => `Id(${value})`
    })
    // The type lift for this monad is just a reference to the factory.
    Id.of = Id
}

{
    const x = 20 // The value
    const p = Promise.resolve(x) // The context
    const f = n =>
        Promise.resolve(n * 2) // The function
    const result = p.then(f) // The application

    result.then(r => console.log(r)) // 40
}

console.log(
    result,
    flatten
)

