let id;
let updateUrl;
let currentTable;

$("document").ready(function () {
  $("#company-info-panel").slideDown();
  $("#manager-table").slideUp();
  $("#employees-table").slideUp();

  // adding datepicker to form
  $(function () {
    $("#datepicker").datepicker({
      dateFormat: "yy-mm-dd"
    });
    //datepicker start Date
    var from = $( "#fromDate" )
      .datepicker({
        dateFormat: "yy-mm-dd",
        changeMonth: true
      })
      .on( "change", function() {
        to.datepicker( "option", "minDate", getDate( this ) );
      }),
      //datepicker End Date
    to = $( "#toDate" ).datepicker({
      dateFormat: "yy-mm-dd",
      changeMonth: true
    })
    .on( "change", function() {
      from.datepicker( "option", "maxDate", getDate( this ) );
    });

  function getDate( element ) {
    var date;
    var dateFormat = "yy-mm-dd";
    try {
      date = $.datepicker.parseDate( dateFormat, element.value );
    } catch( error ) {
      date = null;
    }

    return date;
  }
  });

  $('#btn-company-info').click(function(){
    $("#company-info-panel").slideToggle();
    $("#manager-table").slideUp();
    $("#employees-table").slideUp();
  })
  $('#btn-manager-info').click(function(){
    $("#company-info-panel").slideUp();
    $("#manager-table").slideDown();
    $("#employees-table").slideUp();
  })
  $('#btn-employees-info').click(function(){
    $("#company-info-panel").slideUp();
    $("#manager-table").slideUp();
    $("#employees-table").slideDown();
  })
  $("#show_add_panel").click(function () {
    $("#show_add_panel").css('display', 'none')
    $("#slide").slideToggle();
    $('table').slideToggle();
  })
  $("#cancel").click(function () {
    $('#save').addClass('d-none');
    $('#submit').removeClass('d-none');
    $("#show_add_panel").css('display', 'inline-block')
    $('.input_value').val("");
    $("#slide").slideToggle();
    $('table').slideToggle();
  })
  $(".btn_company_edit").click(function () {
    EditDATA($(this), 'http://localhost:5000/companies/company/edit/')
  });
  $(".btn_employee_edit").click(function () {
    EditDATA($(this), 'http://localhost:5000/employees/employee/edit/')
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
    $('#submit').removeClass('d-none');
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
          console.log(1);
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
  }

  $(".data-cell").click(function(){
   let companyId= $(this).parent().attr('id');
   $("#company_Page_request").attr('action','/companies/company/' + companyId);
   $("#company_Page_request").submit();
  })
});