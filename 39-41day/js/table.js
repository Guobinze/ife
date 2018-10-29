// 创建表格
function createTable(data) {
    // 先检查是否已插入表格，是的话则删除，防止无限堆积
    removeTable();
    removeButton();

    // 先检查数据是否为空，不为空时再插入表格
    if (data != undefined) {
        var regionValue = getChecked("region-radio-wrapper"),
            productValue = getChecked("product-radio-wrapper"),
            table = document.createElement("table"),
            thead = document.createElement("thead"),
            tbody = document.createElement("tbody"),
            tr = document.createElement("tr"),
            th1 = document.createTextNode("商品"),
            th2 = document.createTextNode("地区"),
            thArray = new Array(),
            th;
    
        // 先将表头推入数组，然后以遍历的方式插入表格
        if (regionValue.length == 1 && productValue.length > 1) {
            thArray.push(th2);
            thArray.push(th1);
        }else {
            thArray.push(th1);
            thArray.push(th2);
        }
        
        for (var i = 1; i < 13; i++) {
            thArray.push(document.createTextNode(i + "月"));
        }

        for (var i = 0; i < thArray.length; i++) {
            th = document.createElement("th");
            th.appendChild(thArray[i]);
            tr.appendChild(th);
        }
        
        thead.appendChild(tr);
        table.appendChild(thead);

        // 遍历获取的数据插入表格中
        for (var i = 0; i < data.length; i++) {
            // 读取produc和regino并设置相应的td
            var row = tbody.insertRow(i),
                td1 = document.createElement("td"),
                td2 = document.createElement("td");

            td1.innerHTML = data[i].product;
            td2.innerHTML = data[i].region;

            if (regionValue.length == 1 && productValue.length > 1) {

                if (i == 0) {
                    td2.rowSpan = productValue.length;
                    row.appendChild(td2);
                }

                row.appendChild(td1);
            }else {
                
                if (i % regionValue.length == 0) {
                    var input = document.querySelectorAll("#product-radio-wrapper > input");

                    for (var j = 0; j < input.length; j++) {

                        if (data[i].product == input[j].value) {
                            td1.rowSpan = regionValue.length; 
                        }
                    }
                    row.appendChild(td1);
                }

                if (regionValue.length == 0 && productValue.length != 0) {
                    var input = document.querySelectorAll("#region-radio-wrapper > input");

                    if (i % (input.length - 1) == 0) {
                        td1.rowSpan = input.length - 1;
                        row.appendChild(td1);
                    }
                }

                if (regionValue.length == 0 && productValue.length == 0) {
                    row.appendChild(td1);
                }
                
                row.appendChild(td2);
            }

            for (var j = 0; j < data[i].sale.length; j++) {
                var td = document.createElement("td");
                td.innerHTML = data[i].sale[j];
                row.appendChild(td);
            }
        }

        table.appendChild(tbody);
        tableWrapper.appendChild(table);

        var button = creatButton();
        button.innerHTML = "保存数据";
        tableWrapper.appendChild(button);
    }
}

// 删除表格
function removeTable() {
    var table = document.querySelector("table");

    if (table) {
        table.remove();
    }
}

// 判断tablewrapper下有无button按钮，如果有则先清除再创建，没有则直接创建
function creatButton() {
    var button = document.querySelector("#table-wrapper > button");  

    if (button) {
        button.remove();

        return document.createElement("button");
    }else {
        return document.createElement("button");
    }
}

// 删除表格按钮
function removeButton() {
    var button = document.querySelector("#table-wrapper > button"); 

    if (button) {
        button.remove();
    }
}

// table失去焦点时判断input是否为数字
tableWrapper.addEventListener("blur",function (e) {
    var input = e.target;
    
    if (input.tagName.toLowerCase() == "input") {

        if (isNaN(input.value)) {
            alert("请输入正确的数字")
        }
    }
},true)

// 点击按钮时遍历数据存入localstorage
tableWrapper.addEventListener("click",function (e) {
    var button = e.target;
    var data = new Array();
    var product;
    var input;
    
    // 判断点击的元素是不是button
    if (button.tagName.toLowerCase() == "button") {

        var tr = document.querySelectorAll("tbody > tr");
        
        // 遍历tr,以区分开每行的内容
        for (let i = 0; i < tr.length; i++) {
            var td = tr[i].children;
            data[i] = new Object();
            
            // 如果长度为14，就说明带有product
            if (td.length == 14) {
                // 提取product名称并设置到data里
                product = tr[i].firstChild.innerHTML;
                data[i].product = product;
                data[i].region = tr[i].children[1].innerHTML;

                // 遍历数据，并推送到data中
                data[i].sale = new Array();

                for (let j = 2; j < td.length; j++) {
                    data[i].sale.push(parseInt(td[j].innerHTML));
                }
                

            }else {
                // 提取product名称并设置到data里
                data[i].product = product;
                data[i].region = tr[i].firstChild.innerHTML;

                // 遍历数据，并推送到data中
                data[i].sale = new Array();

                for (let j = 1; j < td.length; j++) {
                    data[i].sale.push(parseInt(td[j].innerHTML));
                }
            }
        } 
    }

    // 先将数据转换成json字符串，再设置到localstorage
    data = JSON.stringify(data);
    localStorage.setItem("tableData",data);
},true)

// 判断localstorage里有无数据
function localData() {
    var tableData = localStorage.getItem("tableData");
    tableData = JSON.parse(tableData);
    
    if (tableData && tableData != 0) {
        return tableData;
    }else {
        return sourceData;
    }
}

// 鼠标移动到单元格上显示编辑两字
tableWrapper.addEventListener("mouseover", function (e) {
    var target = e.target;
    // 检测当前元素是不是单元格
    if (target.nodeName.toLowerCase() == "td") {
        // 如果单元格内没有input则创建并插入
        if (!tableWrapper.querySelector("input")) {
            // 提取单元格内的数字部分
            if (!isNaN(target.innerText)) {
                var span = tableWrapper.querySelector("span");
                // 如果单元格内已经存在span，则先删除再创建
                if (span) {
                    span.remove();
                    span = document.createElement("span");
                    span.innerHTML = "编辑";
                    target.appendChild(span);
                }else {
                    span = document.createElement("span");
                    span.innerHTML = "编辑";
                    target.appendChild(span);
                }
            }
        }
    }
})

// 鼠标点击单元格动态生成可编辑的数字
tableWrapper.addEventListener("click", function (e) {
    var target = e.target; 
    // 如果当前获取的元素是单元格则改变单元格内容
    if (target.nodeName.toLowerCase() == "td") {
        // 提取单元格内的数据并设置成新创建的input的值
        var number = parseInt(target.innerText);
        var input = "<input type = 'text' value = '" + number + "'" + " />";
        target.innerHTML = input;

        // 将焦点设置到input上
        input = target.querySelector("input")
        input.focus();

        // input失去焦点时取消当前的输入
        input.addEventListener("blur", function (e) {
            var target = e.target;
            var td = target.parentNode;
            td.innerHTML = number;

            draw(td);
        })

        // 监听input键盘事件
        input.addEventListener("keydown", function (e) {
            var target = e.target;
            var td = target.parentNode;

            // 按esc则取消当前输入
            if (e.keyCode == 27) {
                td.innerHTML = number;
                draw(td);
            }

            // 按回车取消输入并将新值赋予给单元格
            if (e.keyCode == 13) {
                number = target.value;

                if (isNaN(number)) {
                    alert("请输入正确的数字");
                }else {
                    td.innerHTML = number;
                    draw(td);
                }
            }  
        })

        // 创建确定和取消按钮并插入到单元格中
        var div = document.createElement("div");
        var yes = document.createElement("button");
        yes.id = "yes";
        yes.innerHTML = "确定";

        var no = document.createElement("button");
        no.id = "no";
        no.innerHTML = "取消";

        div.appendChild(yes);
        div.appendChild(no);
        target.appendChild(div);
    }
})

// 监听单元格内取消按钮的点击事件
tableWrapper.addEventListener("click", function (e) {
    var target = e.target;
    // 如果点击了取消按钮，则取消当前输入
    if (target.id == "no") {
        var number = tableWrapper.querySelector("input").value;
        var td = target.parentNode.parentNode;
        td.innerHTML = number;

        draw(td);
    }
})

// 监听单元格内确定按钮的点击事件
tableWrapper.addEventListener("click", function (e) {
    var target = e.target;
    // 如果点击了确定按钮，则取消当前输入并将新值赋予给单元格
    if (target.id == "yes") {
        var number = tableWrapper.querySelector("input").value;
        
        if (isNaN(number)) {
            alert("请输入正确的数字");
        }else {
            var td = target.parentNode.parentNode;
            td.innerHTML = number;

            draw(td);
        }
    }
})