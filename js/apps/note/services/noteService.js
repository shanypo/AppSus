
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
        type: "txt",
        isPinned: true,
        info: {
            title: "Learn Coding",
            txt: "Fullstack Me Baby!"
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
            backgroundColor: 'purple'
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
                { txt: "Coding power", doneAt: 187111111 }
            ]
        },
        style: {
            backgroundColor: 'red'
        }
    },
    {
        id: _makeId(),
        type: 'video',
        isPinned: false,
        info: {
            title: "My Crazy Video",
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
            txt: 'I love my dog he is very sweet :)'
        },
        style: {
            backgroundColor: 'pink'
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