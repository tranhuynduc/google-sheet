
var Configs = {
  "idField": "MNV",
  "nameField": "HỌ VÀ TÊN"
}

class Employee {
  name:string;
  id;
  timesheet;
  constructor(id:number = 0, name = '', timesheet = null) {
    this.name = name;
    this.id = id;
    this.timesheet = timesheet;
  }

}

class Employees {
  employees:Array<Employee>;

  constructor() {
    this.employees = [];
  }
  addEmployee = (e:Employee) => {
    this.employees.push(e);
  }

  init(data:Array<Array<any>>, opts) {
    let headerIndex = opts.headerIndex || 0;
    let idIndex = data[headerIndex].indexOf(Configs.idField);
    let nameIndex = data[headerIndex].indexOf(Configs.nameField);
    for (let i = opts.offset || 0; i < data.length; i++) {
      let value = data[i];
      let e = new Employee(value[idIndex], value[nameIndex]);
      this.addEmployee(e);
    }
  }
}


var employees = new Employees();
