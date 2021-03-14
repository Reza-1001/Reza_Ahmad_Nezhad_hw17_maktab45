let id;
let updateUrl;
let currentTable;
$("document").ready(function () {
  $(function () {
    $("#datepicker").datepicker({
      dateFormat: "yy-mm-dd"
    });
  });
  $("#show_add_panel").click(function () {

    $("#show_add_panel").css('display', 'none')
    $("#slide").slideToggle();
    $('table').slideToggle();

    $.ajax({
      url: '/companies/all/companynames',
      method: "Get",
      contentType: "application/json",
      success: function (data) {
        for (let i of data) {
          let newOption = `<option value=${i._id}>${i.name}</option>`;
          $("#company_list").html($("#company_list").html() + newOption)
        }
      }
    });
  })
  $("#cancel").click(function () {
    $('#save').addClass('d-none');
    $("#show_add_panel").css('display', 'inline-block');
    $('.input_value').val("");
    $("#slide").slideToggle();
    $('table').slideToggle();
  })

  $(".btn_company_edit").click(function () {
    EditDATA($(this), '/companies/company/')
  });
  $(".btn_employee_edit").click(function () {
    EditDATA($(this), '/employees/employee/')
  });
  $("#save").click(function () {

    let data;
    if (currentTable == "companies") {
      data = {
        name: $('#name').val(),
        registrationNo: $('#registrationNo').val(),
        city: $('#city').val(),
        state: $('#state').val(),
        registrationDate: $('#datepicker').val(),
        tel: $('#tel').val(),
      };
    } else if (currentTable == "employees") {
      data = {
        firstName: $('#first_name').val(),
        lastName: $('#last_name').val(),
        nationalId: $('#national_id').val(),
        gender: $('#gender').val(),
        manager: $('#manager').val(),
        dateOfBirth: $('#datepicker').val(),
      };
    } 
    $.ajax({
      url: `${updateUrl}${id}`,
      method: "PUT",
      contentType: "application/json",
      dataType: "text",
      data: JSON.stringify(data),
    });

    $('#save').addClass('d-none');
    $("#show_add_panel").css('display', 'inline-block');
    $('.input_value').val("");
    $("#slide").slideToggle();
    $('table').slideToggle();
  });

  function EditDATA(el, url) {
    var currentTD = el.parents("tr").find("td");
    id = el.parent().parent().parent().get(0).id;

    $.ajax({
      url: `${url}${id}`,
      method: "Get",
      contentType: "application/json",
      success: function (data) {
        $('#save').removeClass('d-none');
        $('#submit').addClass('d-none');
        $("#show_add_panel").css('display', 'none')
        $("#slide").slideToggle();
        $('table').slideToggle();
console.log(data)
        if (el[0].className == "btn_company_edit") {
          updateUrl = "http://localhost:5000/companies/update/";
          currentTable = "companies";
          $('#name').val(data.name);
          $('#registrationNo').val(data.registrationNo);
          $('#city').val(data.city);
          $('#state').val(data.state);
          $('#datepicker').val(data.registrationDate);
          $('#tel').val(data.tel);
        } else if (el[0].className == "btn_employee_edit") {
          updateUrl = "http://localhost:5000/employees/update/";
          currentTable = "employees"
          
          $('#first_name').val(data.firstName);
          $('#last_name').val(data.lastName);
          $('#national_id').val(data.nationalId);
          $('#gender').val(data.gender);
          $('#manager').val(data.manager);
          $('#datepicker').val(data.dateOfBirth);
          $("#company_list").html(`<option value=${data._id}>${data.companyId.name}</option>`)
         
        }

      }
    });
    // if (el.val() == "Edit") {
    //   $.each(currentTD, function () {
    //     $(this).prop("contenteditable", true);
    //     $(this).toggleClass("bg-secondary")
    //   });
    // } else {

    //     if (el[0].className == "btn_company_edit")
    //         url="http://localhost:5000/company/"
    //     else if(el[0].className == "btn_employee_edit")
    //         url="http://localhost:5000/employee/"
    //         console.log(url);
    //   $.each(currentTD, function () {
    //     $(this).prop("contenteditable", false);
    //     $(this).toggleClass("bg-secondary")
    //   });

    //   let headerList = [];
    // let rowData = [];
    // let data={};
    // for (let i = 1; i < currentTD.length - 1; i++) {
    //     data[$("thead").find("th")[i].innerText]=currentTD[i].innerText;
    //   rowData.push(currentTD[i].innerText);
    //   headerList.push($("thead").find("th")[i].innerText);
    // }
    // let id = el.parent().parent().parent().get(0).id;

    // $.ajax({
    //   url: `${url}${id}`,
    //   method: "PUT",
    //   contentType: "application/json",
    //   dataType: "text",
    //   data: JSON.stringify(data),
    // });
    // }
    // el.val(el.val() == "Edit" ? "Save" : "Edit");
  }

  $(".data-cell").click(function(){
   let companyId= $(this).parent().attr('id');
   $("#company_Page_request").attr('action','/companies/company/' + companyId);
   $("#company_Page_request").submit();
  })
});