import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
  fb = inject(FormBuilder);
  service = inject(TaskService);

  form = this.fb.group({
    counters: this.fb.array([])
  });

  get counters(): FormArray {
    return this.form.get('counters') as FormArray;
  }

  addCounter() {
    let counterForm: FormGroup = this.fb.group({
      count: this.fb.control(0)
    })
    this.counters.push(counterForm)
    this.service.counter.set(this.counters.length);
  }

  removeCounter(index: number) {
    this.counters.removeAt(index);
    this.service.counter.set(this.counters.length);
  }

  increment(index: number) {
    console.log(index)
    this.counters.at(index).get(['count'])!.setValue(this.counters.at(index).get(['count'])?.value + 1);
  }

  decrement(index: number) {
    this.counters.at(index).get(['count'])!.setValue(this.counters.at(index).get(['count'])?.value - 1);
  }

  reset() {
    this.counters.clear();
    this.service.counter.set(0);
  }
}
