// 创建表格
function createTable(func) {
    // 先检查是否已插入表格，是的话则删除，防止无限堆积
    removeTable();
    
    var data = func;
    
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
            var row = tbody.insertRow(i);
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
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
    }
}

// 删除表格
function removeTable() {
    var table = document.querySelector("table");

    if (table) {
        table.remove();
    }
}