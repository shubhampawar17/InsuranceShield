import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminService } from 'src/app/Services/admin.service';
import { NotificationService } from 'src/app/Services/notification.service';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent {
 isSearch=false
  currentPage = 1;
  totalAgentCount = 0;
  agents: any;
  headers: any
  paginatedAgent: any[] = [];
  oldAgentObj: any
  pageSizes: number[] = [5,10,15, 20, 25,30,35,40,45,50];
  agentObj: any
  pageSize = this.pageSizes[0];
  searchQuery:string|number='';
  isAdmin=false
  isEmployee=false
  jwtHelper=new JwtHelperService()
  constructor(private admin: AdminService, private router: Router,private location:Location, private notification: NotificationService) { }
  ngOnInit(): void {
    this.getAgents();
   const decodedToken= this.jwtHelper.decodeToken(localStorage.getItem('token')!);
   const role: string = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
   this.isEmployee = role === 'EMPLOYEE';
   this.isAdmin = role === 'ADMIN';

  }
  goBack(){
    this.location.back()
  }
  getAgents(){
    this.admin.getFilterAgents(this.currentPage, this.pageSize,this.searchQuery).subscribe({
      next: (response: { headers: { get: (arg0: string) => any; }; body: any; }) => {

        const paginationHeader = response.headers.get('X-Pagination');
          console.log(paginationHeader);
          const paginationData = JSON.parse(paginationHeader!);
           console.log(paginationData.TotalCount);

          this.totalAgentCount=paginationData.TotalCount;
        this.agents = response.body;
        console.log(this.agents)

      },
      error:(err:HttpErrorResponse)=>{
        this.agents=null;
        console.log(err.message);

      }
    })
  }
  get pageNumbers(): number[] {
    return Array.from({ length: this.pageCount }, (_, i) => i + 1);
  }
  get pageCount(): number {
    return Math.ceil(this.totalAgentCount / this.pageSize);
  }



  changePage(page: number) {
   
    this.currentPage = page;
    this.getAgents();
  }
  calculateSRNumber(index: number): number {
    return (this.currentPage - 1) * this.pageSize + index + 1;
  }
  onPageSizeChange(event:Event){
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.getAgents();
  }
  updatePaginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedAgent = this.agents.slice(start, end);
  }
  onEdit(agentObj: any) {
    this.oldAgentObj = JSON.stringify(agentObj);
    console.log(this.oldAgentObj);

    console.log(JSON.stringify(agentObj));
    this.paginatedAgent.forEach(element => {
      element.isEdit = false;
    });
    agentObj.isEdit = true;
  }
  validateEmail(item:any){
    const regexPattern=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(regexPattern.test(item))
     return false;
    return true
   }
   validatePhone(item:any){
    const regexPattern=/^\d{10}$/;
    if(regexPattern.test(item))
    return false
  return true
   }
   validateField(item:any){
    if(item!=='')
    return false;
   else
    return true
  
   }
   validateForm(obj:any)
   {
    console.log(obj);
    if((!this.validateField(obj.mobileNumber)&&!this.validatePhone(obj.mobileNumber))&&(!this.validateField(obj.email)&&!this.validateEmail(obj.email))&&(!this.validateField(obj.status))){
  return true
    }
    return false
   }
  onUpdate(agentObj: any) {
    console.log(agentObj)
    delete agentObj.isEditable;
    if(this.validateForm(agentObj)){
    console.log(agentObj)
    this.admin.updateAgent(agentObj).subscribe({
      next: (data: any) => {
        console.log(data);
        this.notification.showSuccess("Updated Successfully")
        this.getAgents()
      },
      error: (error: HttpErrorResponse) => {

        console.log(error);
      }


    })
  }
  else{
    this.notification.showError("Invalid details! Try Again")
    this.getAgents();
  }
   agentObj.isEditable = !agentObj.isEditable
  }
  onCancel(obj: any) {
    const oldObj = JSON.parse(this.oldAgentObj);
    obj.agentFirstName = oldObj.agentFirstName;
    obj.agentLastName = oldObj.agentLastName,
    obj.email=oldObj.email,
    obj.qualification=oldObj.qualification
    obj.phone = oldObj.phone,
    obj.status=oldObj.status
      
      obj.isEdit = false;
  }
  onDelete(agent: any) {
    this.admin.deleteAgent(agent.id).subscribe({
      next: (data: any) => {
        console.log(data)
        this.notification.showSuccess("Deleted Successfully");
        setTimeout(() => location.reload(), 1500);

      },
      error(error: HttpErrorResponse) {
        console.log(error.message)
      }
    })
  }
  
  viewCommission(agent:any){
    this.router.navigateByUrl('employee/agents/commission/'+agent.id)
  }
 
  onSearch() {
   
   this.isSearch=!this.isSearch
    this.getAgents();
  }
  addAgent() {
    this.router.navigateByUrl('employee/addagent')
    }
resetSearch(){
  this.searchQuery=''
  this.getAgents()
  this.isSearch=false
}
}
