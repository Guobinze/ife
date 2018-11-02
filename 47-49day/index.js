//餐厅类
function Restaurant(obj) {
    for (const key in obj) {
        if (key === "cash") {
            this.cash = obj[key];
        }else if (key === "seats") {
            this.seats = obj[key];
        }else if (key === "staff") {
            this.staff = obj[key];
        }
    }
}

Restaurant.prototype.hire = function (info) {
    this.staff.push(info);
    
}

Restaurant.prototype.fire = function (info) {
    var menuIndex = this.staff.menuIndexOf(info);
    
    if (menuIndex != -1) {
        this.staff.splice(menuIndex,1);
    }
}

//职员类
var id = 0;

function Staff(name,wage) {
    id += 1;
    this.id = id;
    this.name = name;
    this.wage = wage;
}

Staff.prototype.work = function () {
    console.log("完成一次工作");
}

//使用单例模式创建服务员
var waiter = (function () {
    var instance;

    function WaiterSingleton(name, wage) {
        Staff.call(this, name, wage);
        console.log("服务员" + this.name + "已创建");
    };

    WaiterSingleton.prototype.work = function (args) {
        //如果参数不为空，则记录点菜并让厨师开始做菜；如果为空则说明厨师做好了菜需要上菜
        if (args) {
            console.log("记录点菜");
            
        }else {
            console.log("上菜");
        }
    }

    return {
        getInstance: function (name, wage) {
            if (!instance) {
                instance = new WaiterSingleton(name, wage);
            }

            return instance;
        }
    };
})();

//使用单例模式创建厨师
var cook = (function () {
    var instance;

    function CookSingleton(name, wage) {
        Staff.call(this, name, wage)

        console.log("厨师" + this.name + "已创建");
    };

    CookSingleton.prototype.work = function (menu) {
        var time = menu.time;
        console.log("开始做" + menu.name);

        setTimeout(function () {
            console.log("做好了");
        }, time * 1000);
    }

    return {
        getInstance: function (name, wage) {
            if (!instance) {
                instance = new CookSingleton(name, wage);
            }

            return instance;
        }
    };
})();

//顾客类
function Customer() {}

Customer.prototype.order = function (menu) {
    //随机点餐
    var number = Math.floor(Math.random() * menu.length);

    //防止随机点餐数为0
    while (number == 0) {
        number = Math.floor(Math.random() * menu.length);
    }

    var menuRandom = [];

    for (var i = 0; i < number; i++) {
        var random = Math.floor(Math.random() * menu.length);
        //防止点餐重复
        if (menuRandom.indexOf(menu[random]) === -1) {
            menuRandom.push(menu[random]);
        }
    }
    
    return menuRandom;
}

Customer.prototype.eat = function (food, index) {
    var p = document.querySelectorAll("#customer-box > p");
    var temp = 5;

    var eat = setInterval(function () {
        if (temp > 1) {
            p[index].innerHTML = food.name + "还有" + --temp + "s吃完";
        }else {
            p[index].innerHTML = food.name + "已吃完";
        } 
    },1000);

    setTimeout(function () {
        clearInterval(eat);
    }, temp * 1000);
}

Customer.prototype.pay = function (menu) {
    var money = 0;

    for (var i = 0; i < menu.length; i++) {
        money += menu[i].price;
    }

    restaurant.cash += money;
}

//菜品类
function Menu(name, time, price, cost) {
    this.name = name;
    this.time = time;
    this.price = price;
    this.cost = cost;
}

//定义时间单位
var time = 1;

//测试代码
//创建餐厅
var restaurant = new Restaurant({
    cash: 10000,
    seats: 1,
    staff: []
});

//创建菜单
var menuList = [];
menuList.push(new Menu("土豆丝",5,15,5));
menuList.push(new Menu("干豆腐丝",5,10,3));
menuList.push(new Menu("麻辣鸡丝",5,20,8));
menuList.push(new Menu("鱿鱼丝",5,25,10));

//雇佣一个服务员
var newWaiter = waiter.getInstance("张三", 3000);
restaurant.hire(newWaiter);

//雇佣一个厨师
var newCook = cook.getInstance("李四", 5000);
restaurant.hire(newCook);

//创建顾客列表和索引
var customerList = [1,2,3,4];
var newCustomer;
var index = 0;
var menuIndex = 0;

//定义服务函数
function run() {
    waiterMove(0.5, 180, 280);

    var promise = new Promise(function (resolve, reject) {
        if (index == customerList.length) {
            return;
        }

        //顾客进店坐下
        var customer = document.querySelector("#customer > img");
        customer.style.position = "absolute";    
        customer.style.top = "-200px";
        customer.style.left = "130px";
        customer.style.transition = "0.5s";

        newCustomer = new Customer(customerList[index]);
        index++;

        console.log("有顾客来啦");

        //顾客点餐
        var customerWarp = document.getElementById("customer-box");
        var menu = newCustomer.order(menuList);
        var temp = 3;

        var count = setInterval(function () {
            customerWarp.innerHTML = "点菜中" + "&nbsp;" + "还有" + temp-- + "s点完";
        },1000);

        setTimeout(function () {
            clearInterval(count);
            customerWarp.innerHTML = "";

            for (var i = 0; i < menu.length; i++) {
                var p = document.createElement("p");
                p.innerHTML = menu[i].name + "还未上";
                customerWarp.appendChild(p);
            }
        }, 4000);

        setTimeout(resolve, time * 3 * 1000, menu);
    }).then (function (menu) {
        //服务员记录点餐
        newWaiter.work(menu);

        //告诉厨师做菜
        menuIndex = 0;
        cooking(menu);
    });
}

//定义做菜函数
function cooking(menu) {
    new Promise (function (resolve, reject) {
        var time = menu[menuIndex].time;

        //显示待做菜列表
        cookList(menu, menuIndex);
        newCook.work(menu[menuIndex]);
        menuIndex++;

        setTimeout(resolve, time * 1000, menuIndex);
    }).then (function (menuIndex) {
        //告诉服务员上菜
        newWaiter.work();
        waiterMove(0.5, 180, 320);
        newCustomer.eat(menu[menuIndex - 1], menuIndex - 1);

        //如果没上完菜继续回去等厨师出餐，如果都上完了等待顾客结账
        if (menuIndex < menu.length) {
            cooking(menu);
        }else {
            setTimeout(function () {
                newCustomer.pay(menu);
                waiterMove(0.5, 45, 150);
                
                var cash = document.getElementById("cash");
                cash.innerHTML = "$" +restaurant.cash;

                var customer = document.querySelector("#customer > img");
                customer.remove();
            },5000);

            setTimeout(function () {
                run();
            },6000);
        }
    });
}

//在厨师图片下显示待做菜的列表
function cookList(menu, index) {
    setTimeout(function () {
        waiterMove(0.5, 70, 580);
    }, 500);
    
    var time = menu[index].time;
    
    var count = setInterval(function () {
        var status = document.getElementById("status");
        status.innerHTML = "";

        for (var i = 0; i < menu.length; i++) {
            var p = document.createElement("p");
            var name = menu[i].name;

            if (i == index) {
                if (time > 1) {
                    p.innerHTML = "开始做" + name + "&nbsp;" + "还有" + --time + "s";
                }else {
                    p.innerHTML = name;
                }
            }else {
                p.innerHTML = name;
            }

            status.appendChild(p);  
        }
    },1000);

    setTimeout(function () {
        clearInterval(count);
    },time * 1000);
}

//定义服务员移动函数
function waiterMove(time, top, right) {
    var waiter = document.getElementById("waiter");
    waiter.style.transition = time + "s";
    setTimeout(function () {
        waiter.style.top = top + "px";
        waiter.style.right = right + "px";
    }, time * 1000);
}

//开始服务
document.querySelector("button").onclick = function () {
    if (index != 0) {
        return;
    }

    run();
}

//页面加载完设置餐厅现金数量和初始状态
window.onload = function () {
    var status = document.getElementById("status");
    var p = document.getElementById("cash");
    var cash = "$" + restaurant.cash;

    p.innerHTML = cash;
    status.innerHTML = "空闲中";
}