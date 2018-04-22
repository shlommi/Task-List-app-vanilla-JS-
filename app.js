  // Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task')


// Load all event listeners
loadEventListeners();
//   create one big function of  all event listeners
function  loadEventListeners(){
  //  DOM Load event to show the LS tasks in the <ul>
  document.addEventListener('DOMContentLoaded', getTasks)// this is event that called after the Dom is loaded
  // Add task EventListener
  form.addEventListener('submit', addTask);
  // remove task event using event deligation on <ul></ul>
  taskList.addEventListener('click', removeTask);
  // clear tasks event
  clearBtn.addEventListener('click', clearTasks);
  // filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// get tasks from LS 
function getTasks(){
  let tasks; // initalize a variabe that includes al the tasks in LS
  if(localStorage.getItem('tasks') === null ){ // check if there any tasks in Ls
    tasks = []; // set it to empty [] to avoid errors
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));// set tasks whwatever in LS. LS can only  store a strings - we need to parse it
  }
  tasks.forEach(function(task){
        // create li element 
      const li = document.createElement('li'); 
      // Add a class to this element
      li.className = 'collection-item';
      // Create a TextNode and append to  this li
      li.appendChild(document.createTextNode(task));
      // create new Link element that X icon that delete his li
      const link = document.createElement('a');   
      // add a class  to link element
      link.className = 'delete-item secondary-content';
      // add  the link icon using innerHTML
      link.innerHTML = '<i class="fa fa-remove"></i>'
      // append the link to his new li
      li.appendChild(link);
      // append the new li to the exist ul
      taskList.appendChild(li); 
  });
}

// Add task function
function addTask(e){
  if(taskInput.value === '') {
    alert('add a task please...');
  }
  // create li element 
  const li = document.createElement('li'); 
  // Add a class to this element
  li.className = 'collection-item';
  // Create a TextNode and append to  this li
  li.appendChild(document.createTextNode(taskInput.value));
  // create new Link element that X icon that delete his li
  const link = document.createElement('a');   
  // add a class  to link element
  link.className = 'delete-item secondary-content';
  // add  the link icon using innerHTML
  link.innerHTML = '<i class="fa fa-remove"></i>'
  // append the link to his new li
  li.appendChild(link);
  // append the new li to the exist ul
  taskList.appendChild(li);

  // store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // finally clear the input
  taskInput.value = '';
  e.preventDefault();
}

// store Task in local storage function
function storeTaskInLocalStorage(task){
  let tasks; // initalize a variabe that includes al the tasks in LS
  if(localStorage.getItem('tasks') === null ){ // check if there any tasks in Ls
    tasks = []; // set it to empty [] to avoid errors
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));// set tasks whatever in LS. LS can only  store a strings - we need to parse it
  }
  // push the task paramter that the user typed in the input and adding to the 'tasks' Array
  tasks.push(task);
  // last thing set it back to LS as a string ONLY
  localStorage.setItem('tasks', JSON.stringify(tasks));
}



// remove task event using event deligation on <ul></ul>
function removeTask(e){
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('are you sure?')){
      e.target.parentElement.parentElement.remove();
      // remove it from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// remove from LS
function removeTaskFromLocalStorage(taskItem){
  let tasks; // initalize a variabe that includes al the tasks in LS
  if(localStorage.getItem('tasks') === null ){ // check if there any tasks in Ls
    tasks = []; // set it to empty [] to avoid errors
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));// set tasks whatever in LS. LS can only  store a strings - we need to parse it
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

  // set LS again and update it with minus li
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// clear tasks
function clearTasks(){
  // taskList.innerHTML = '';

  //faster way
  while(taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // clear from lS
  clearTasksFromLocalStorage();
}

//clear tasks from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// filter tasks
function filterTasks(e){
 const inputText = e.target.value.toLowerCase();
 // we are itering through the li's in the ul element
 document.querySelectorAll('.collection-item').forEach(
   function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(inputText) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
