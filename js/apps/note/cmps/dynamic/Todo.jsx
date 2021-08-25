// {
//     id: "n103",
//         type: "todos",
//             info: {
//         label: "Get my stuff together",
//             todos: [
//                 { txt: "Driving liscence", doneAt: null },
//                 { txt: "Coding power", doneAt: 187111111 }
//             ]
//     }
// }


// <input type="checkbox" id={`todo-${idx}`} />
// <label for={`todo-${idx}`}>{todo.txt}</label>

export function Todo({ todo }) {
    console.log('todo', todo)
    return (
        <div className="note" >ssssss
            {/* <h3>{note.info.title}</h3>
            <img src={note.info.url} /> */}
        </div>
    )
}