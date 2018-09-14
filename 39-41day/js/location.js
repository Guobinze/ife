// 设置location.hash
function setHash() {
    // 获取已点击的按钮
    var region = getChecked("region-radio-wrapper");
    var product = getChecked("product-radio-wrapper");
    var temp = new Array();

    // 遍历按钮的id并推入临时数组
    for (let i = 0; i < region.length; i++) {
        temp.push(region[i].id);
    }

    for (let i = 0; i < product.length; i++) {
        temp.push(product[i].id);
    }

    // 将id推入hash
    location.hash = temp;
}

// 获取locaotion.hash并进行页面渲染
function getHash() {
    // 获取hash并将其推入数组
    var hash = location.hash;
    hash = hash.slice(1);
    hash = hash.split(",");
    
    // 获取页面的input按钮，并根据hash遍历input将符合条件的按钮激活
    var input = document.querySelectorAll("input");

    for (let i = 0; i < input.length; i++) {
        
        for (let j = 0; j < hash.length; j++) {
            
            if (input[i].id == hash[j]) {
                input[i].checked = true;
            }
        }
    }
    // 进行页面渲染
    var data = getCheckData(localData());
    createTable(data);
    
    lineChart.setData(data);
    lineChart.drawMany();
}