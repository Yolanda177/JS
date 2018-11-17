
/*
function dateAddMonth(date, month) {
    //....
}

var date = new Date();
dateAddMonth(date, 1);


function showList() {
    for(var i = 0, j = employees.length; i < j;i++) {
        var expectedSalary = employees[i].calculateExpectedSalary();
        var experience = employees[i].getExperience();
        var portfolio;

        if (employees[i].type === 'manager') {
            portfolio = employees[i].getNBAProjects();
        } else {
            portfolio = employees[i].getGithubLink();
        }

        var data = {
            expectedSalary: expectedSalary,
            experience: experience,
            portfolio: portfolio
        };
        render(data);
    }
}


class BankAccount {
    constructor() {
        this.balance = 1000;
    }
    Withdraw(amount) {
        if (verifyAmountCanBeDeducted(amount)) {
            this.balance -= amount;
        }
    }
}

var bankAccount =  new BankAccount();
bankAccount.Withdraw(100);


//闭包，
var Employee = (function () {
    function Employee(name) {
        this.getName = function () {
            return name;
        };
    }
    return Employee;
}());

var employee = new Employee('Maneger Zhang');
consloe.log('Employee name: ' + employee.getName());
delete employee.name;
consloe.log('Employee name: ' +employee.getName());

var newInfo = {};
for (var key in info) {
    if (info.hasOwnProperty(key)) {
        newInfo[key] = info[key];
    }
}
*/
var obj1 = new Object();
var obj2 = obj1;
obj1.name = "Jason";
console.log(obj2.name);























