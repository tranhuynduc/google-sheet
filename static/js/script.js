var Configs = {
    "idField": "MNV",
    "nameField": "HỌ VÀ TÊN"
};
var Employee = /** @class */ (function () {
    function Employee(id, name, timesheet) {
        if (id === void 0) { id = 0; }
        if (name === void 0) { name = ''; }
        if (timesheet === void 0) { timesheet = null; }
        this.name = name;
        this.id = id;
        this.timesheet = timesheet;
    }
    return Employee;
}());
var Employees = /** @class */ (function () {
    function Employees() {
        var _this = this;
        this.addEmployee = function (e) {
            _this.employees.push(e);
        };
        this.employees = [];
    }
    Employees.prototype.init = function (data, opts) {
        var headerIndex = opts.headerIndex || 0;
        var idIndex = data[headerIndex].indexOf(Configs.idField);
        var nameIndex = data[headerIndex].indexOf(Configs.nameField);
        for (var i = opts.offset || 0; i < data.length; i++) {
            var value = data[i];
            var e = new Employee(value[idIndex], value[nameIndex]);
            this.addEmployee(e);
        }
    };
    return Employees;
}());
var employees = new Employees();
