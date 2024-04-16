import { AfterViewChecked, AfterViewInit, Component, ElementRef, ViewChild, ViewChildren, viewChild } from '@angular/core';
import { Todo } from './model/Todo';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'ViewChild Demo';  
  @ViewChild(TodoComponent) child?:TodoComponent = new TodoComponent;
  
  parentMessage: string ="Let's add new item ..."; 
  todos : Array<Todo> = [];
  model!:Todo ;

  constructor(){
    this.todos=[];
  }
  
  ngAfterViewInit(): void {
    this.model = this.child!.model;
  }
  
  addTodo(res : Todo)
  {  
      this.model={
        task:res.task,        
        complete:res.complete
      }
      this.todos.push(this.model);
      this.ngAfterViewInit();
  }
  removeTodo(res:Todo)
  {
    console.log("removeTodo");
    this.todos.splice(this.todos.findIndex(a=>res==a), 1);
  }
}
