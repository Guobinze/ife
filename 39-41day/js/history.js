

// 设置pushState
function setHistory() {
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

    // 将id推入state
    history.pushState(temp,null,"#" + temp);
}

// 获取state
function getState() {
    var state = history.state;

    // 获取页面的input按钮，并根据state遍历input将符合条件的按钮激活
    var input = document.querySelectorAll("input");

    for (let i = 0; i < input.length; i++) {
        input[i].checked = false;
    }

    for (let i = 0; i < input.length; i++) {
        
        for (let j = 0; j < state.length; j++) {
            
            if (input[i].id == state[j]) {
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

window.addEventListener("popstate", getState);