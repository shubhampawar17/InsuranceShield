import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { CustomerService } from 'src/app/Services/customer.service';
import { ValidateForm } from 'src/app/helper/validateForm';
import { Scheme } from 'src/app/models/Scheme';
import { SchemeDetails } from 'src/app/models/SchemeDetails';
import { Location } from '@angular/common';
import { ValidatorFn, FormBuilder } from '@angular/forms';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { of } from 'rxjs';
@Component({
  selector: 'app-update-scheme',
  templateUrl: './update-scheme.component.html',
  styleUrls: ['./update-scheme.component.css']
})
export class UpdateSchemeComponent implements OnInit {
  scheme:Scheme=new Scheme()
  schemeId!:any
  schemeData!:any
  updateSchemeForm!: FormGroup;
  documents: any;
  selectedDocuments: string[] = [];
  status: any;
  constructor(private activatedroute:ActivatedRoute,private admin:AdminService,private fb: FormBuilder,private customer:CustomerService,private location:Location){}
  ngOnInit() {
    this.documents = [
      { id: 'aadhar', value: 'AadharCard', label: 'Aadhar Card' },
      { id: 'pan', value: 'PanCard', label: 'PAN Card' },
      { id: 'voter', value: 'VoterId', label: 'Voter ID' },
      { id: 'passport', value: 'Passport', label: 'Passport' },
      { id: 'license', value: 'DrivingLicense', label: 'Driving License' },
      { id: 'passbook', value: 'BankPassbook', label: 'Bank Passbook' }
    ];
    this.schemeId = (this.activatedroute.snapshot.paramMap.get('id'));
    // alert(this.schemeId);
    this.customer.getSchemeById(this.schemeId).subscribe({
      next:(res)=>{
        this.schemeData=res
        console.log(this.schemeData)
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err)
      }
    })
    this.updateSchemeForm = this.fb.group(
          {
            schemeName: [
              '',
              [
                Validators.required,
                ValidateForm.onlyCharactersValidator
                // this.checkDuplicateSchemeName.bind(this) 
              ]
            ],
            schemeImage: [''],
            description: ['', [Validators.required, ValidateForm.onlyCharactersValidator]],
            minAmount: ['', [Validators.required, Validators.min(1),ValidateForm.integer]],
            maxAmount: ['', [Validators.required, Validators.min(1),ValidateForm.integer]],
            minAge: ['', [Validators.required, Validators.min(1), Validators.max(60),ValidateForm.integer]],
            maxAge: ['', [Validators.required, Validators.min(1), Validators.max(100),ValidateForm.integer]],
            minInvestTime: ['', [Validators.required, Validators.min(1),ValidateForm.integer]],
            maxInvestTime: ['', [Validators.required, Validators.min(1),ValidateForm.integer]],
            profitRatio: ['', [Validators.required, Validators.min(0)]],
            registrationCommRatio: ['', [Validators.required, Validators.min(0)]],
            installmentCommRatio: ['', [Validators.required, Validators.min(0)]],
            requireddocuments: [''],
            planId: [''] 
          },
          {
            validators: [
              this.minMaxValidator('minAmount', 'maxAmount'),
              this.minMaxValidator('minAge', 'maxAge'),
              this.minMaxValidator('minInvestTime', 'maxInvestTime')
            ]
          }
        );
    
        // Value changes subscription for checking duplicate scheme name
        this.updateSchemeForm
          .get('schemeName')
          ?.valueChanges.pipe(
            debounceTime(1000), // Wait for 500ms after the user stops typing
            switchMap((schemeName) => this.checkDuplicateSchemeName(schemeName)),
            catchError((err) => of(false)) // Handle error by returning false if something fails
          )
          .subscribe((isDuplicate) => {
            console.log(isDuplicate);
            this.status = isDuplicate;
            if (isDuplicate.body.exists) {
              this.updateSchemeForm.get('schemeName')?.setErrors({ duplicateSchemeName: true });
            } else {
              this.updateSchemeForm.get('schemeName')?.setErrors(null);
            }
          });
        }
      
    
  

      
  onCheckboxChange(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const value = checkbox.value;
  
    if (checkbox.checked) {
      this.selectedDocuments.push(value);
    } else {
      this.selectedDocuments = this.selectedDocuments.filter(doc => doc !== value);
    }
  
    console.log(this.selectedDocuments);
    this.updateSchemeForm.get('requireddocuments')?.setValue(this.selectedDocuments);
  }
  minMaxValidator(minField: string, maxField: string) {
    console.log(minField);
    console.log(maxField);
    return (formGroup: FormGroup): { [key: string]: boolean } | null => {
      const minControl = formGroup.get(minField);
      const maxControl = formGroup.get(maxField);
  
      // Ensure both controls exist and have valid values
      if (minControl && maxControl && minControl.value != null && maxControl.value != null) {
        if (minControl.value >= maxControl.value) {
          
          return { [`${minField}GreaterThanMax`]: true };
          this.updateSchemeForm.get('schemeName')?.setErrors({ duplicateSchemeName: true })
        }
      }
      return null; // Validation passes
    };
  }

  checkDuplicateSchemeName(schemeName: string) {
      if (!schemeName) {
        return of(false); // Return false if scheme name is empty
      }
      return this.admin.checkSchemeNameDuplicate(schemeName).pipe(
        catchError(() => of(false)) // Return false if the backend request fails
      );
    }
  updateScheme() {
  console.log(this.updateSchemeForm.value)
  if(this.updateSchemeForm.valid)
  {
    const newData = {
      schemeId: this.schemeId,
      schemeName: this.updateSchemeForm.get('schemeName')!.value!,
      planId: this.schemeData.body['planId'],
      description: this.updateSchemeForm.get('description')!.value!,
      minAmount: this.updateSchemeForm.get('minAmount')!.value!,
      maxAmount: this.updateSchemeForm.get('maxAmount')!.value!,
      minAge: this.updateSchemeForm.get('minAge')!.value!,
      maxAge: this.updateSchemeForm.get('maxAge')?.value!,
      minInvestTime: this.updateSchemeForm.get('minInvestTime')?.value!,
      maxInvestTime: this.updateSchemeForm.get('maxInvestTime')?.value!,
      profitRatio: this.updateSchemeForm.get('profitRatio')?.value!,
      registrationCommRatio: this.updateSchemeForm.get('registrationCommRatio')?.value!,
      installmentCommRatio: this.updateSchemeForm.get('installmentCommRatio')?.value!,
      requireddocuments:this.selectedDocuments
    };
       console.log(newData)
       this.admin.updateScheme2(newData).subscribe(
        {
          next:(res)=>{
            console.log(res);
            alert("Scheme Updated Successfully")
            this.goBack();
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err);
          }
        }
       )
  }else{
    alert("Please Enter Details Correctly");
  }
    
    }
    goBack(){
      this.location.back()
    }
}
