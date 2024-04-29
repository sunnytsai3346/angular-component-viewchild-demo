import { Component, EventEmitter, Input, Output, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { Todo } from '../model/Todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
   
  @Input() parentMessageData: string ="";
  @Input() color: string ="";
  @Output() messageEvent:EventEmitter<Todo> = new EventEmitter<Todo>();
  model:Todo;  
  //View Children
  @ViewChildren("childheading") childheading!: QueryList<any>;
  
  constructor(private renderer:Renderer2){
    this.model= {      
      task:"",
      complete:false,
    }
  }

  ngAfterViewInit(): void {
    
    console.log(this.childheading)
    //ViewChildren
    this.childheading.forEach(item => {
      this.renderer.setStyle(item.nativeElement, 'color', this.color)
    })
    //this.renderer.setStyle(this.childheading.last.nativeElement, 'color', 'blue');

  }
  taskChange(event:KeyboardEvent){
    this.model.task = (event.target as HTMLInputElement).value;
    
  }
  onSubmit()
  {    
    this.messageEvent.emit(this.model); 
    
    
    
  }

}
