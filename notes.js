const fs = require('fs')
const chalk = require('chalk')


const addNote = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.bold('New note added!'))
    } else {
        console.log(chalk.red.bold('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const availableNote = notes.filter((note) => note.title != title)

    if (notes.length > availableNote.length) {
        console.log(chalk.green('Note removed!'))
        saveNotes(availableNote)
    } else {
        console.log(chalk.red('No note found!'))
    }
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log(chalk.gray.bold(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.bold('Note not found!'))
    }
}

const listNotes = () => {
    console.log(chalk.red.bold('Your notes!'))
    const notes = loadNotes();

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

module.exports  = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}