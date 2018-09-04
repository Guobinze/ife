var region = document.getElementById("region-select"),
    product = document.getElementById("product-select"),
    tableWrapper = document.getElementById("table-wrapper");

// 根据select获取数据
function getSelectData() {
    var regionValue = region.value,
        productValue = product.value,
        data1 = new Array(),
        data2 = new Array();

    // 如果select不为空，则获取数据
    if (regionValue != "选择地区" || productValue != "选择商品") {

        for (var key in sourceData) {

            if (sourceData[key].region == regionValue) {
                data1.push(sourceData[key]);
            }
        }

        if (regionValue != "选择地区" && productValue != "选择商品") {

            for (var key in data1) {
                if (data1[key].product == productValue) {
                    data2.push(data1[key]);  
                }
            }

            return data2;
        }

        if (regionValue != "选择地区" && productValue == "选择商品") {
            return data1;
        }

        if (productValue != "选择商品" && regionValue == "选择地区") {

            for (var key in sourceData) {

                if (sourceData[key].product == productValue) {
                    data2.push(sourceData[key]);
                }
            }
            
            return data2;
        }
    }
}