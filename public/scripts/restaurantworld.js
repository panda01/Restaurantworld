/*
*	The restaurant world framework
*	Reliant and bound to jQuery
*/

(function($)
{
	$.rw = {
		init: function()
		{
			this.initDOM();
			this.initEvents();
		},
		initDOM: function()
		{
			$(':input').each(function()
			{
				var type = $(this).attr('type') || 'text';
				var classes = $(this).attr('class') || '';
				var name = $(this).attr('name') || '';
				
				if( val = $(this).attr('value') )
					$(this).data('watermark', val);
				
				$(this).wrap('<div class="input-wrap ' + classes + '" />')
				
				switch(type)
				{
					case 'password':
					{
						if( val )
							$(this).before('<input type="text" value="' + val + '" class="placeholder ' + classes + '" name="' + name + '" />')
								.hide()
								.val('')
								.prev().data('watermark', val);
					}
					case 'text': case '':
					{
						$(this).after('<div class="errors d-none"></div>');
					}
				}
			});
		},
		initEvents: function()
		{
			$(':input').focus(function()
				{
					var type = $(this).attr('type') || 'text';
					switch( type )
					{
						case 'submit': case 'button': case 'radio':
							return;
						case 'text':
						{
							//does it have a watermark, and is that it's current value
							if( mark = $(this).data('watermark') )
							{
								if( $(this).hasClass('placeholder') )
								{
									$(this).hide()
										.next().show().focus();
								}
								else if( $(this).val() === mark )
									$(this).val('');
							}
						}
					}
				})
				.blur(function()
				{
					var type = $(this).attr('type') || 'text';
					switch( type )
					{
						case 'submit': case 'button': case 'radio':
							return;
						case 'text':
						{
							if( mark = $(this).data('watermark') )
								if( $(this).val() === '' )
									$(this).val( mark );
							break;
						}
						case 'password':
						{
							if( $(this).val() === '' && $(this).data('watermark') )
								$(this).hide()
									.prev('.placeholder').show();
						}
					}
				});
		}
	}
	$(document).ready(function(){ $.rw.init() });
}(jQuery))

function log(m)
{
	if(console.log)
		console.log( m );
}