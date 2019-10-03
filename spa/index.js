let todos = [
  {
    id: 1,
    name: "Teach Class at Nagarro",
    done: true,
    deadline: new Date().toLocaleString()
  },
  {
    id: 2,
    name: "Get Coffee",
    done: false,
    deadline: new Date().toLocaleString()
  } 
];

function render(state) {
  return state
    .map(todo => {
      const classString = todo.done ? `class = "list-group-item striked"` : `class = "list-group-item"`
      return `<li data-todo="${todo.id}" ${classString}><a href="#" class = "reorder-up"><i class="fa fa-arrow-up" aria-hidden="true"></i></a><a href="#" class = "reorder-down"> <i class="fa fa-arrow-down" aria-hidden="true"></i></a> ${todo.name} <span  class = "deadline"> ${todo.deadline} </span>  </li>`;
    })
    .join("");
}

function paint() {
  $("ul").html(render(todos));
}

function addTodo() {
 
  const inputBox = $('#newTodo')
  const inputdate = $('#deadlineDate')
  const inputtime = $('#deadlineTime')
  const deadline = new Date(inputdate.val() + ' ' + inputtime.val())
  const dd = deadline.toLocaleString()
  
  todos.push({
    id: todos.length + 1,
    name: inputBox.val(),
    done: false,
    deadline: dd
  })

  inputBox.val('')

  paint()
}



function removeTodos() {
  todos = todos.filter(todo => !todo.done)

  paint()
}


$('ul').on("click", function (e) {
  const idToFind = e.target.dataset.todo
  const todo = todos.find(todo => todo.id == idToFind)
  todo.done = !todo.done

  paint()
})

$('#newTodo').on("keypress", function (e) {
  if (e.which == 13) {
    addTodo()
  }
})

paint();

$(".reorder-up").click(function(){
  var $current = $(this).closest('li')
  var $previous = $current.prev('li');
  if($previous.length !== 0){
    $current.insertBefore($previous);
  }
  return false;
});

$(".reorder-down").click(function(){
  var $current = $(this).closest('li')
  var $next = $current.next('li');
  if($next.length !== 0){
    $current.insertAfter($next);
  }
  return false;
});
