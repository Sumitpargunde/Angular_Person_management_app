import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms'; // Only import FormsModule
import { CommonModule } from '@angular/common'; // Ensure CommonModule is imported
import { UserModel } from '../Model/user';
import { UserService } from '../Service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Keep CommonModule and FormsModule
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {

  userList: UserModel[] = [];
  editMode: boolean = false;

  user: UserModel = {
    department: "",
    name: "",
    mobile: 0,
    email: "",
    gender: "",
    doj: "",
    city: "",
    salary: 0,
    address: "",
    status: false,
  }

  constructor(private _userService: UserService, private _toastrService: ToastrService) {}

  ngOnInit(): void {
    this.getUserList();
  }

  cityList: string[] = ["Mumbai", "Pune", "Hyderabad", "Bangluru", "Delhi"];
  departmentList: string[] = ["IT", "HR", "Account", "Sales", "Management"];

  getUserList() {
    this._userService.getUsers().subscribe((res) => {
      this.userList = res;
    })
  }

  onSubmit(form: NgForm): void {
    if (this.editMode) {
      this._userService.updateUser(this.user).subscribe(() => {
        this.getUserList();
        this.editMode = false;
        form.reset();
        this._toastrService.success('User Updated Successfully!!!', 'Success');
      });
    } else {
      this._userService.addUser(this.user).subscribe(() => {
        this.getUserList();
        form.reset();
        this._toastrService.success('User Added Successfully!!!', 'Success');
      });
    }
  }

  onEdit(userdata: UserModel) {
    this.user = userdata;
    this.editMode = true;
  }

  onDelete(id: any) {
    const isConfirm = confirm("Are sure want to delete this user?");
    if (isConfirm) {
      this._userService.deleteUser(id).subscribe(() => {
        this._toastrService.error('User deleted successfully!!!', 'Deleted');
        this.getUserList();
      })
    }
  }

  onResetForm(form: NgForm) {
    form.reset();
    this.editMode = false;
    this.getUserList();
  }
}
