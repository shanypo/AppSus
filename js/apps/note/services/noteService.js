
export const noteService = {
    query,
    saveNewNote,
    deleteNote,
    getNoteById,
    updateNote,
    updateNoteTodo,
    updateNoteColor,
    updateNotePinned
}

import { storageService } from '../../../services/storage.service.js'
import { _makeId } from '../../../services/util.service.js'

const KEY = 'noteDB';

// Dafult Notes // 

const dafultNotes = [
    {
        id: _makeId(),
        type: "img",
        isPinned: true,
        info: {
            url: "././././img/panda.jpeg",
            title: 'Panda',
            txt: 'this is my dog Panda and I love her so much :)'
        },
        style: {
            backgroundColor: 'purple'
        }
    },
    {
        id: _makeId(),
        type: "txt",
        isPinned: true,
        info: {
            title: "My Story",
            txt: "One day Jhon woke up and then na na na, and more na na na. after that he was na na na..."
        },
        style: {
            backgroundColor: 'green'
        }
    },
    {
        id: _makeId(),
        type: "img",
        isPinned: true,
        info: {
            url: "https://picsum.photos/200/300",
            title: 'Thailand',
            txt: 'this is my photo from my trip in Thailand'
        },
        style: {
            backgroundColor: 'yellow'
        }
    },
    {
        id: _makeId(),
        type: "todos",
        isPinned: true,
        info: {
            title: "Get my stuff together",
            todos: [
                { txt: "Driving liscence", doneAt: null },
                { txt: "Clean Dishes", doneAt: 187111111 },
                { txt: "go to the gym", doneAt: null },
                { txt: "call my ex", doneAt: null },
                { txt: "buy food", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: 'red'
        }
    },
    {
        id: _makeId(),
        type: 'video',
        isPinned: true,
        info: {
            title: "The Beatles!",
            url: 'https://www.youtube.com/embed/yJyClObyUOs',
            txt: 'I like this video, na na na , more things , na na na and even more things ...'
        },
        style: {
            backgroundColor: 'blue'
        },
        searchKey: 'beatles'
    },
    {
        id: _makeId(),
        type: "img",
        isPinned: true,
        info: {
            url: 'https://ggsc.s3.amazonaws.com/images/uploads/The_Science-Backed_Benefits_of_Being_a_Dog_Owner.jpg',
            title: 'My Dog',
            txt: 'I love my dog he is very sweet :), his name is Panda'
        },
        style: {
            backgroundColor: 'pink'
        }
    },
    {
        id: _makeId(),
        type: "img",
        isPinned: false,
        info: {
            url: "https://picsum.photos/200/300",
            title: 'Me and my family',
            txt: 'I love my  family, na na na ...'
        },
        style: {
            backgroundColor: 'pink'
        }
    },
    {
        id: _makeId(),
        type: "todos",
        isPinned: true,
        info: {
            title: "Making a new Track",
            todos: [
                { txt: "write lyrics", doneAt: 187111111 },
                { txt: "make choros chords change", doneAt: 187111111 },
                { txt: "sketch a basic sample", doneAt: 187111111 },
                { txt: "recored singer", doneAt: 187111111 },
                { txt: "production", doneAt: null },
                { txt: "mixing", doneAt: null },

            ]
        },
        style: {
            backgroundColor: 'orange'
        }
    },
    {
        id: _makeId(),
        type: "img",
        isPinned: true,
        info: {
            url: "././././img/panda2.jpeg",
            title: 'Panda traveling',
            txt: 'dogs are the best animals in the world'
        },
        style: {
            backgroundColor: 'blue'
        }
    },
    {
        id: _makeId(),
        type: "txt",
        isPinned: false,
        info: {
            title: "Miss You",
            txt: "na na na Iso miss you, you are my friend na na na , and even more na na na.."
        },
        style: {
            backgroundColor: 'white'
        }
    },
    {
        id: _makeId(),
        type: "txt",
        isPinned: false,
        info: {
            title: "Panda",
            txt: "Panda is My Dog and I so like her! :) Panda is the best dog in the universe.."
        },
        style: {
            backgroundColor: 'green'
        }
    },
    {
        id: _makeId(),
        type: "txt",
        isPinned: true,
        info: {
            title: "New Song",
            txt: "Love you baby, love you so much... na na na na... love you baby, love you so mouch..."
        },
        style: {
            backgroundColor: 'white'
        }
    },
    {
        id: _makeId(),
        type: "todos",
        isPinned: true,
        info: {
            title: "make Dinner",
            todos: [
                { txt: "Cut onion", doneAt: 187111111 },
                { txt: "mix eggs", doneAt: null },
                { txt: "eat and clean dishes", doneAt: null },

            ]
        },
        style: {
            backgroundColor: 'blue'
        }
    },
];

let gNotes = _loadNotesFromStorage() || dafultNotes;

// LOAD NOTES + FILTER //

function query(filterBy) {
    const storageNotes = _loadNotesFromStorage()
    gNotes = (storageNotes) ? storageNotes : dafultNotes;

    if (filterBy) { // { searchKey , type }
        let { searchKey, type } = filterBy
        const carsToShow = gNotes.filter(note => {
            if (note.type !== 'todos') {
                return (note.info.title.toLowerCase().includes(searchKey.toLowerCase()))
                    && note.type.includes(type)
            } else {
                return (
                    (
                        (note.info.todos.some(todo => {
                            return todo.txt.toLowerCase().includes(searchKey.toLowerCase())
                        })
                        ))
                    && note.type.includes(type))
            }
        })
        return Promise.resolve(carsToShow)
    }
    return Promise.resolve(gNotes)
}

//  DELTE NOTE //

function deleteNote(noteId) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes.splice(noteIdx, 1)
    _saveNotesToStorage()
    return Promise.resolve()
}

function _getNoteIdxById(noteId) {
    return gNotes.findIndex(function (note) {
        return noteId === note.id
    })
}

// UPDATE NOTE //

function updateNote(newNote) {
    const noteIdx = _getNoteIdxById(newNote.id)
    gNotes.splice(noteIdx, 1, newNote)
    _saveNotesToStorage()
    return Promise.resolve()
}

function updateNoteColor(noteId, color) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes[noteIdx].style.backgroundColor = color
    _saveNotesToStorage()
    return Promise.resolve()
}

function updateNotePinned(noteId) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes[noteIdx].isPinned = !gNotes[noteIdx].isPinned
    _saveNotesToStorage()
    return Promise.resolve()
}

// GET NOTE //

function getNoteById(noteId) {
    const noteIdx = _getNoteIdxById(noteId)
    return Promise.resolve(gNotes[noteIdx])
}

// SAVE NEW NOTE //

function saveNewNote(note) { // {title, isPinned, backgroundColor, todos}
    note.id = _makeId()
    gNotes.push(note)
    _saveNotesToStorage()
    return Promise.resolve()
}

// UPDATE TODO //

function updateNoteTodo(noteId, todoIdx, newTodo) {
    const noteIdx = _getNoteIdxById(noteId)
    gNotes[noteIdx].info.todos[todoIdx] = newTodo;
    _saveNotesToStorage()
    return Promise.resolve()
}

// STORAGE - SAVE AND LOAD //

function _loadNotesFromStorage() {
    return storageService.loadFromStorage(KEY)
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}