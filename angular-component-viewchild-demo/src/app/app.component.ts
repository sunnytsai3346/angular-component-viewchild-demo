import { AfterViewChecked, AfterViewInit, Component, ElementRef, QueryList, Renderer2, ViewChild, ViewChildren, viewChild } from '@angular/core';
import { Todo } from './model/Todo';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `.completed {
      text-decoration: line-through;
    }`
  ],
})
export class AppComponent implements AfterViewInit {
  title = 'ViewChild Demo';  
  @ViewChild(TodoComponent) child?:TodoComponent = new TodoComponent(this.renderer);
  //View Children
  @ViewChildren("childheading") childheading!: QueryList<any>;
  
  parentMessage: string ="Let's add new item ..."; 
  color:string="red";
  todos : Array<Todo> = [];
  model!:Todo ;

  constructor(private renderer: Renderer2){
    this.todos=[];
  }
  
  ngAfterViewInit(): void {
    this.model = this.child!.model;
    console.log(this.childheading)
    //ViewChildren
    this.childheading.forEach(item => {
      this.renderer.setStyle(item.nativeElement, 'color', 'blue')
    })
    
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
