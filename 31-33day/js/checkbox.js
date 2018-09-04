var regionCheck = document.getElementById("region-radio-wrapper"),
    productCheck = document.getElementById("product-radio-wrapper");

// 检查checkbox的点击状态
function checkClick(e) {
    // 先把除input外的标签筛选出去
    if (e.target.type == "checkbox") {
        var checkbox;

        // 根据容器选择相应的input
        if (e.target.parentNode.id == "region-radio-wrapper") {
            checkbox = document.querySelectorAll("#region-radio-wrapper > input");
        }else if (e.target.parentNode.id == "product-radio-wrapper") {
            checkbox = document.querySelectorAll("#product-radio-wrapper > input");
        }

        if (e.target.name == "all") {
            // 如果点击了全选，则所有checkbox都为勾选状态，反之亦然
            if (e.target.checked) {
                for (var i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = true;
                }
            }else {
                for (var i = 0; i < checkbox.length; i++) {
                    checkbox[i].checked = false;
                }
            }
        }else {
            var flag1 = false;
            var flag2 = true;

            // 如果点击对象是唯一被勾选的，则取消后重新赋为勾选状态
            for (var i = 0; i < checkbox.length; i++) {
                if (checkbox[i].checked) {
                    flag1 = true;
                    break;
                }
            }

            if (!flag1) {
                e.target.checked = true;
            }

            // 如果不满足全选状态，贼取消全选的勾选，反之将全选勾上
            for (var i = 1; i < checkbox.length; i++) {
                if (!checkbox[i].checked) {
                    flag2 = false;
                    break;
                }
            }

            if (flag2) {
                checkbox[0].checked = true;
            }else {
                checkbox[0].checked = false;
            }
        }
    }
}

//获取checkbox的数据
function getCheckData() {
    var regionValue = getChecked("region-radio-wrapper"),
        productValue = getChecked("product-radio-wrapper"),
        data1 = new Array(),
        data2 = new Array();

    //如果选项不为空则获取数据
    if (regionValue.length != 0 || productValue.length != 0) {

        for (var key in sourceData) {

            for (var i = 0; i < regionValue.length; i++) {

                if (sourceData[key].region == regionValue[i].value) {
                    data1.push(sourceData[key]);
                }
            }  
        }

        if (regionValue.length != 0 && productValue.length != 0) {

            for (var key in data1) {

                for (var i = 0; i < productValue.length; i++) {

                    if (data1[key].product == productValue[i].value) {
                        data2.push(data1[key]);  
                    }
                }
            }

            return data2;
        }

        if (regionValue.length != 0 && productValue.length == 0) {
            return data1;
        }

        if (productValue.length != 0 && regionValue.length == 0) {

            for (var key in sourceData) {

                for (var i = 0; i < productValue.length; i++) {
                    
                    if (sourceData[key].product == productValue[i].value) {
                        data2.push(sourceData[key]);
                    }
                }
            }

            return data2;
        }
    } 
}

//获取已勾选的checkbox
function getChecked(wrapper) {
    var item = document.getElementById(wrapper),
        itemValue = item.querySelectorAll("input"),
        temp = new Array();

    for (var i = 1; i < itemValue.length; i++) {
        if (itemValue[i].checked) {
            temp.push(itemValue[i]);
        }
    }

    return temp;
}