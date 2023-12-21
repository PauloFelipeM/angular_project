import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FruitsService } from '../../../services/fruits.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-fruit',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './fruit.component.html',
  styleUrl: './fruit.component.scss',
})
export class FruitComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private fruitsService: FruitsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: new FormControl({ value: null, disabled: true }),
      name: new FormControl(null, [Validators.required]),
    });

    this.route.params.subscribe((params) =>
      this.getItem(!isNaN(params['id']) ? params['id'] : null)
    );
  }

  async getItem(id: number) {
    if (id) {
      this.fruitsService.get(id).subscribe((response) => {
        if (response) {
          this.form.controls['id'].enable();
          this.form.controls['id'].setValue(response.id);
          this.form.controls['name'].setValue(response.name);
        }
      });
    }
  }

  async save() {
    const data = this.form.value;
    data.id
      ? this.fruitsService.update(data).subscribe(() => {
          this.router.navigate(['']);
        })
      : this.fruitsService.new(data).subscribe(() => {
          this.router.navigate(['']);
        });
  }
}
