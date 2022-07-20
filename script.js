
// task value
const task = document.getElementById('taskInput');

// task list
let tasklist = [];
if (localStorage.getItem("tasklist") !== null) {
    tasklist = JSON.parse(localStorage.getItem("tasklist"));
}

let ul = document.getElementById('tasklisthtml')

let editmode=false;
displaytask()
var completed = ''
// task function
function displaytask(){
    
    // edit
    if (editmode){
        for (let i of tasklist){
            // check control
            if (i.status== 'completed'){
                completed = 'checked'
            }else{
                completed = ''
            }

            // add
            if (i.id == Idedit){
                i.taskname = task.value;
                ul.innerHTML= '';
                for (i of tasklist){
                    let li =  `<li class="list-group-item editlist ${i.status}">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" onclick="check(this)" value="" id="${i.id} " ${completed}>
                                        <label class="form-check-label " for="${i.id}">
                                        ${i.taskname}
                                        </label>
                                    </div>
                                    <div class="editlistitem">
                                        <button type="button" onclick="deletetask(${i.id})" class="btn-sm btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button>
                                        <button type="button" onclick="edittask(${i.id})" class="btn-sm btn btn-secondary"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                                    </div>
                                </li>`
                    ul.insertAdjacentHTML('beforeend',li);
                    localStorage.setItem("tasklist", JSON.stringify(tasklist));
                };
            }
        }
        editmode=false
        // empty task list
    }else if (tasklist.length == 0) {
        ul.innerHTML = "<p class='p-3 m-0'>Görev listeniz boş.</p>"}
        // task list
    else{
        ul.innerHTML= '';
        for (i of tasklist){
            // check control
            if (i.status== 'completed'){
                completed = 'checked'
            }else{
                completed = ''
            }

            let li =  `<li class="list-group-item editlist">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" onclick="check(this)" value="" id="${i.id}" ${completed}>
                                <label class="form-check-label" for="${i.id}">
                                ${i.taskname}
                                </label>
                            </div>
                            <div class="editlistitem">
                                <button type="button" onclick="deletetask(${i.id})" class="btn-sm btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button>
                                <button id='edit-btn' type="button" onclick="edittask(${i.id})" class="btn-sm btn btn-secondary"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
                            </div>
                        </li>`
            ul.insertAdjacentHTML('beforeend',li)
            if (i.status== 'completed'){
                console.log(ul)
            }else{
                
            }
        };
    }
    task.value = ''
    console.log(tasklist)
}
// newtask

function newtask(){
    if (task.value ==''){
        alert('Please Write A Task')
    }
    else if(tasklist.length ==0){
        tasklist.push({'id': 1 , 'taskname': task.value, 'status': 'pending'});
        displaytask();
    }
    else if(editmode){
        displaytask()
    }
    else{
        tasklist.push({'id':tasklist[tasklist.length-1].id + 1 , 'taskname': task.value, 'status': 'pending'});
        displaytask();
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
    }
};
document.querySelector('#taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      newtask();
    }
});

function deletetask(deletedId){
    for(i in tasklist){
        if(tasklist[i].id == deletedId){
            tasklist.splice(i, 1);
            localStorage.setItem("tasklist", JSON.stringify(tasklist));
        }
    }
    displaytask();
};
let Idedit;
function edittask(editedId){
        editmode=true
        for (i of tasklist){
            if (i.id == editedId){
                task.value = i.taskname
                Idedit = i.id
                task.focus();
            }
        }
};

function clearall(){
    tasklist = [];
    displaytask();
    localStorage.setItem("tasklist", JSON.stringify(tasklist))
};
function check(selectedTask) {
    let label = selectedTask.nextElementSibling;
    let status;

    if(selectedTask.checked) {
        label.classList.add("checked");
        status = "completed";
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
    } else {
        label.classList.remove("checked");
        status = "pending";
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
    }

    for (let gorev of tasklist) {
        if(gorev.id == selectedTask.id) {
            gorev.status = status;
        }
        if(status=='completed'){
            selectedTask.nextElementSibling.style.textDecoration  = 'line-through';
            selectedTask.nextElementSibling.style.color  = 'green'
        }else{
            selectedTask.nextElementSibling.style.textDecoration  = 'none';
            selectedTask.nextElementSibling.style.color  = 'black'
        }
        localStorage.setItem("tasklist", JSON.stringify(tasklist));
    }
}
