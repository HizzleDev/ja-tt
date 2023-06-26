const express = require('express')
const cors = require('cors')
const nocache = require('nocache')
const NodeCache = require('node-cache')
const initialUsers = require('./data.json')

const app = express()
app.use(cors())
app.use(express.json())
app.use(nocache())

const port = process.env.PORT || 3002

const userCache = new NodeCache()
userCache.set('users', initialUsers)

app.listen(port, () => console.log(`Listening on port ${port}`))

const isNumeric = (str) => {
    if (str === undefined) return false
    if (typeof str != 'string') return false // we only process strings!
    return (
        !isNaN(Number(str)) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
        !isNaN(parseFloat(str))
    ) // ...and ensure strings of whitespace fail
}

app.get('/users', (req, res) => {
    const startQs = req.query.start
    const limitQs = req.query.limit

    if (!startQs || !limitQs || !isNumeric(startQs) || !isNumeric(limitQs)) {
        res.status(400).send()
        return
    }

    const start = parseInt(startQs)
    const limit = parseInt(limitQs)

    const users = userCache.get('users')

    if (start >= users.length) {
        throw Error('failed to list users')
    }

    const usersToReturn = users.slice(start, limit + start)

    res.status(200).send({ users: usersToReturn })
})

app.put('/user', async (req, res) => {
    const userToUpdate = req.body
    if (
        !userToUpdate ||
        !userToUpdate.id ||
        !userToUpdate.firstName ||
        !userToUpdate.lastName ||
        !userToUpdate.email ||
        !userToUpdate.company ||
        !userToUpdate.postCode ||
        !userToUpdate.userName
    ) {
        res.status(400).send()
    }

    const users = userCache.get('users')

    const indexToUpdate = users.findIndex((user) => user.id === userToUpdate.id)
    const newUsers = [...users]
    newUsers[indexToUpdate] = userToUpdate

    userCache.set('users', newUsers)

    res.status(200).send({ user: userToUpdate })
})

app.post('/user', async (req, res) => {
    const newUser = req.body
    if (
        !newUser ||
        !newUser.id ||
        !newUser.firstName ||
        !newUser.lastName ||
        !newUser.email ||
        !newUser.company ||
        !newUser.postCode ||
        !newUser.userName
    ) {
        res.status(400).send()
    }

    const users = userCache.get('users')

    const newUsers = [...users]
    newUsers.unshift(newUser)

    userCache.set('users', newUsers)

    res.status(201).send({ user: newUser })
})

app.get('/user', async (req, res) => {
    const userName = req.query.userName

    if (!userName) {
        res.status(400).send()
        return
    }

    const users = userCache.get('users')

    const user = users.find((user) => user.userName === userName)

    if (!user) {
        res.status(404).send()
        return
    }

    res.status(200).send({ user })
})

app.get('/total-users', async (req, res) => {
    const users = userCache.get('users')

    res.status(200).send({ total: users.length })
})

app.delete('/user', async (req, res) => {
    const id = req.query.id

    if (!id) {
        res.status(400).send()
        return
    }

    const users = userCache.get('users')

    const foundIndex = users.findIndex((user) => user.id === id)
    if (foundIndex < 0) {
        res.status(404).send()
        return
    }

    const newUsers = [...users]

    newUsers.splice(foundIndex, 1)
    userCache.set('users', newUsers)

    res.status(200).send()
})
