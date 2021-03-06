let form = document.getElementById('todoForm');
let submitBtn = document.getElementById('submit');
let done = document.getElementById('done');
let arrayOfTasks = [];

function createTask() {
  let radioOnInput = document.querySelectorAll('input#rank'); //grabs all inputs with id #rank
  let rank; //exposes value of rank within the for loop to the constructor function
  //loops through length of radioOnInput, whichever is selected changes submit color
  for (let i = 0; i < radioOnInput.length; i++) {
    //listens for change on any radio
    let x = radioOnInput[i].addEventListener('change', e => {
      e.preventDefault();
      submitBtn.style.backgroundColor = '#51cc7a'; //changes color of submit text
      submitBtn.removeAttribute('disabled'); //removes the disabled attribute on submit
      x = radioOnInput[i];
      rank = x.value; //stores the rank/priority user assigns to task
      console.log(rank);
    });
  }
  form.addEventListener(
    'submit' || 'keydown',
    e => {
      e.preventDefault();

      //resets submit button to require radio button selection before adding task
      submitBtn.setAttribute('disabled', true); //second argument doesn't matter if true or false
      submitBtn.style.backgroundColor = '#a3a19a';

      let task = thingTodo.value; // stores the task typed by user

      //creating new function by using the constructor function, AddNewTask
      let newTask = new AddNewTask(task, rank);
      console.log('this should be ranked', arrayOfTasks);

      let liNode = document.createElement('li'); //creating li node. must be local scope.
      let textNode = document.createTextNode(task); //grabs value from task key
      let done = document.createElement('div');
      done.innerHTML = '<i class="far fa-check-square"></i>';
      done.setAttribute('id', 'doneBtn');

      let trash = document.createElement('div');
      trash.innerHTML = '<i class="fas fa-trash-alt"></i>';
      trash.setAttribute('id', 'trashBtn');

      let todoList = document.getElementById('red');
      let green = document.getElementById('green');
      let orange = document.getElementById('orange');

      liNode.appendChild(trash);
      liNode.appendChild(done);


      if (newTask.rank === '1') {
        liNode.appendChild(textNode); //adds value from task to <li>
        todoList.appendChild(liNode); //appends the <li> to the <ul>
      } else if (newTask.rank === '2') {
        liNode.appendChild(textNode); //adds value from task to <li>
        orange.appendChild(liNode); //appends the <li> to the <ul>
      } else {
        //3
        liNode.appendChild(textNode); //adds value from task to <li>
        green.appendChild(liNode); //appends the <li> to the <ul>
      }

      //done button
      done.addEventListener(
        'click',
        e => {
          e.preventDefault();
          console.log('you just clicked on done');
          liNode.style.color = '#1d1d1d';
          liNode.style.textDecoration = 'line-through';
        },
        false
      );

      //trash button
      trash.addEventListener(
        'click',
        e => {
          e.preventDefault();
          console.log('you just clicked on trash');
          liNode.remove();
        },
        false
      );

      form.reset();
    },
    false
  );
}

createTask();

//constructor function
function AddNewTask(task, rank) {
  this.task = task;
  this.rank = rank;
}

//smooth scroll to any anchor tag
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
