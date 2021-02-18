import { Injectable } from '@angular/core';
import {Observable, Subject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class GlobalService {
    private subject = new Subject<any>();

    sendMessage(type:string, value: any) {
        this.subject.next({ type: type,value:value });
    }

    

    clearMessages() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}

