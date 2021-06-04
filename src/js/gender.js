$(document).ready(function(){
	
	$(".custom-checkbox").click(function() {
		// GET THE INPUT
		var activeInput = $(this).children("input");
		
		if(activeInput.is(':checked')) {
			// DESELECT IF ALREADY CHECKED
			$(activeInput).prop("checked", false);
		} else {
			// SELECT IF NOT CHECKED
			$(activeInput).prop("checked", true);
		}
		
		// IF RADIO REMOVE SELECTION FROM OTHER OPTIONS
		if(activeInput.is('[type=radio]')){
			var nonActiveInput = $(this).siblings().children("input");
			$(nonActiveInput).prop("checked", false);
		}
		
	});
	
});