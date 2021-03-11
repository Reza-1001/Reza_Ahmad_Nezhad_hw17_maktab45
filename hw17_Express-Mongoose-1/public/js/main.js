$("document").ready(function () {
  $("td").hover(function () {
    $(".edit_panel").css("display", "block");
  });
  $(".btn_company_edit").click(function () {
    EditDATA($(this))
  });
  $(".btn_employee_edit").click(function () {
    EditDATA($(this))
  });
  function EditDATA(el){
    let url;
    var currentTD = el.parents("tr").find("td");

    if (el.val() == "Edit") {
      $.each(currentTD, function () {
        $(this).prop("contenteditable", true);
        $(this).toggleClass("bg-secondary")
      });
    } else {
        
        if (el[0].className == "btn_company_edit")
            url="http://localhost:5000/companies/update/"
        else if(el[0].className == "btn_employee_edit")
            url="http://localhost:5000/employees/update/"
            console.log(url);
      $.each(currentTD, function () {
        $(this).prop("contenteditable", false);
        $(this).toggleClass("bg-secondary")
      });
      
      let headerList = [];
    let rowData = [];
    let data={};
    for (let i = 1; i < currentTD.length - 1; i++) {
        data[$("thead").find("th")[i].innerText]=currentTD[i].innerText;
      rowData.push(currentTD[i].innerText);
      headerList.push($("thead").find("th")[i].innerText);
    }
    let id = el.parent().parent().parent().get(0).id;
    console.log(id);
    $.ajax({
      url: `${url}${id}`,
      method: "PUT",
      contentType: "application/json",
      dataType: "text",
      data: JSON.stringify(data),
    });
    }
    el.val(el.val() == "Edit" ? "Save" : "Edit");
  }
});
