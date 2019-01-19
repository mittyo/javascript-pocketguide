const map = f => xs => xs.reduce((a, c) => a.concat([f(c)]), [])
const filter = pred => xs => xs.reduce((a, c) => pred(c) => ? a.concat([c]) : a, [])
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x)
const composeP = (...fns) => x => fns.reduceRight(async (v, f) => f(await v))
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)
const pipeP = (...fns) => x => fns.reduce(async (v, f) => f(await v))
const head = xs => xs[0]
const reverse = reduce((a, x) => [x].concat(a), [])
const last = compose(head, reverse)
