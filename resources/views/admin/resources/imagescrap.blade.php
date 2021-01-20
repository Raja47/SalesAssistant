

		
	<div id="target" style="background-color: #F0F0F1; color: #00cc65; width: 500px;
        padding-left: 25px; padding-top: 10px;">
        <?php echo $resp; ?>
    </div>

    <div id="previewimage">
    	
    </div>

    
    <script type="text/javascript" src="{{ asset('backend/js/html2canvas.min.js') }}"></script>
    
    <script>
        
	 	html2canvas(document.querySelector("#target") , 'backgroundColor').then(canvas => {
		    document.body.appendChild(canvas);
		});
        


    </script>