export class stepsEnabledService {

    //whether steps can be activated
    //also whether to highlight in menu 

    public step1: any = {};
    public step2: any = {};
    public step3: any = {};
    public step4: any = {};
    public step5: any = {};

    constructor() { 
        this.step1.enabled = true;
        this.step2.enabled = false;
        this.step3.enabled = false;
        this.step4.enabled = false;
        this.step5.enabled = false;
    }
}