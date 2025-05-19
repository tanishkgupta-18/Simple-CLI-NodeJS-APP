const fs = require('fs');
const filepath = './tasks.json';

const loadTasks = () => {
    try{
        const dataBuffer = fs.readFileSync(filepath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}

const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filepath, dataJSON);
}

const listTasks = () => {
    const tasks = loadTasks();
    console.log('Your tasks:');
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.task}`);
    });
}

const removeTask = (index) => {
    const tasks = loadTasks();
    if(index < 1 || index > tasks.length){
        console.log('Invalid task number');
        return;
    }
    const removedTask = tasks.splice(index - 1, 1);
    saveTasks(tasks);
    console.log('Task removed:', removedTask[0].task);
}

const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log('New task added:', task);
}
const command = process.argv[2];
const arguement = process.argv[3];

if(command === 'add'){
    addTask(arguement)
}else if(command === 'list'){
    listTasks();
}else if(command === 'remove'){
    removeTask(parseInt(arguement));
}else{
    console.log('command not recognized');
}