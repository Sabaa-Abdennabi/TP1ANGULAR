import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TodoComponent } from "./todo/todo.component";
import { TodoRouting } from "./todo-routing.module";

@NgModule({
declarations: [TodoComponent],
imports: [CommonModule, FormsModule, TodoRouting], 
exports: [TodoComponent], })
export class TodoModule {}