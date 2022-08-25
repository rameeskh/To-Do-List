//selecting the elements
const clear=document.querySelector(".clear");
const dateElement=document.getElementById("date");
const list=document.getElementById("list");
const input=document.getElementById("input");

//taking the class names of icons
const CHECK="fa-check-circle";
const UNCHECK="fa-circle-thin";
const LINE_THROUGH="lineThrough";

//create array to save todos
let LIST,id;

//get item from localstorage;
let data=localStorage.getItem("TODO");

//check for datat

if(data){
    LIST=JSON.parse(data);
    //set id as last
    id=LIST.length;
    loadList(LIST);
}
else{
    LIST=[];
    id=0;
}
console.log(LIST)
//loading items
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name,item.id,item.done,item.trash);
    })
}

//clear list

clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})

//date showing
const options={weekday : "long",month:"short", day:"numeric"}
const today=new Date();
dateElement.innerHTML=today.toLocaleDateString("en-US",options);
// function refreshTime() {
//     const timeDisplay = document.getElementById("time");
//     const dateString = new Date().toLocaleString();
//     const formattedString = dateString.replace(", ", " - ");
    
//     dateElement.innerHTML=formattedString
//   }
//     setInterval(refreshTime, 1000);


//add to do fuction
function addToDo(toDo,id,done,trash){
    if(trash){ return;}
    const DONE=done? CHECK:UNCHECK;
    const LINE=done?LINE_THROUGH:"";

    const item=`<li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${LINE}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i> </li>
    `
    const position="beforeend";
    list.insertAdjacentHTML(position,item);
}



//add item to the list when we press enter key
document.addEventListener("keyup",function(e){
    if(e.key=="Enter"){
        const toDo=input.value;
        // console.log(e);
        if(toDo){
            addToDo(toDo,id,false,false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false
            })
            //set item in localstorage
            localStorage.setItem("TODO",JSON.stringify(LIST));
            id++;
        }
        input.value="";
    }
})

//if completed todo

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done=LIST[element.id].done?false:true;
}

//remove toDo

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash=true;
}

//selecting or clicking the created todos

list.addEventListener("click",function(event){
    //select clicked element
    const element=event.target;
    const elementJob=element.attributes.job.value;

    if(elementJob=="complete"){
        completeToDo(element);
    }
    else if(elementJob=="delete"){
        removeToDo(element);
    }

     //set item in localstorage
     localStorage.setItem("TODO",JSON.stringify(LIST));
})