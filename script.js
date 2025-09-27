const input = document.getElementById('task-input')
const addBtn = document.getElementById('add-btn')
const list = document.getElementById('task-list')

let tasks = JSON.parse(localStorage.getItem('tasks')) || []

function renderTasks() {
  list.innerHTML = ''
  tasks.forEach((task, index) => {
    const li = document.createElement('li')
    li.className = 'task' + (task.completed ? ' completed' : '')
    const span = document.createElement('span')
    span.textContent = task.text
    span.onclick = () => toggleTask(index)
    const actions = document.createElement('div')
    actions.className = 'actions'
    const editBtn = document.createElement('button')
    editBtn.className = 'edit'
    editBtn.textContent = 'Edit'
    editBtn.onclick = () => editTask(index)
    const delBtn = document.createElement('button')
    delBtn.className = 'delete'
    delBtn.textContent = 'Delete'
    delBtn.onclick = () => deleteTask(index)
    actions.appendChild(editBtn)
    actions.appendChild(delBtn)
    li.appendChild(span)
    li.appendChild(actions)
    list.appendChild(li)
  })
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function addTask() {
  const text = input.value.trim()
  if (text) {
    tasks.push({ text, completed: false })
    input.value = ''
    renderTasks()
  }
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed
  renderTasks()
}

function editTask(index) {
  const newText = prompt('Update your task:', tasks[index].text)
  if (newText !== null && newText.trim()) {
    tasks[index].text = newText.trim()
    renderTasks()
  }
}

function deleteTask(index) {
  tasks.splice(index, 1)
  renderTasks()
}

addBtn.addEventListener('click', addTask)
input.addEventListener('keypress', e => {
  if (e.key === 'Enter') addTask()
})

renderTasks()
