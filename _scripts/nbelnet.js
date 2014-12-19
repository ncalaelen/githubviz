configData = [];
chartConfig = [];



function chefOrchestre(configFile, modeLayout, pageName, specialCharts) {
	var dsv = d3.dsv(";", "text/plain");
	dsv(configFile, function(configData) {
		configData.forEach(function(d,i) {
			if (+d.chart_draw == 1 || d.chart_draw == "") { // zappe la création de chart si spécifié.
				// appelle fonction de création des éléments DOM (divs) si la config est en mode 'automatique'.
				(modeLayout == "auto") ? createHTMLdivs(configData, d, i) : "";
				// appelle la fonction de remplissage des éléments HTML avec les valeurs contenues dans une ligne de config.
				(modeLayout == "auto") ? fillHTMLdivs(configData, d, i) : "";
				// appelle fonction de création de chart Dimple
				prepareDimpleChart (configData, d, i);
				// appelle fonction de préparation des datas
				//prepareData (configData, d, i, chartConfig);
				// appelle fonction de création de chart Dimple
				// alert(chartConfig["chartLibrary"]);
				(chartConfig["chartLibrary"] == "dimple") ? drawDimpleChart(configData, d, i, chartConfig) : drawD3Chart(configData, d, i, chartConfig);
				
				// prépare bouton de copie.
				//encode_as_link();
				//encode_as_img_and_link();
				//svgtopng();
			} else { // a zappé la création de chart si spécifié.
			console.warn("#" + chartConfig["finalContainer"] +" est désactivé. (chartDraw = 0).");
			}
			
		});
			// appelle fonction de création de chart Manuelle lorsque toutes les boucles sont terminées (mais ça veut dire qu'on ne peut utiliser ni i ni d).
			drawManualChart(pageName);
			
	});
	// place un lien pour générer une image.
}

/**
	function encode_as_link(){
		//var imgsvg = chartConfig["finalContainer"].children("svg");
		//var imgsvg = d3.select(this).children("svg")
		//	.attr("version", "1.1")
		//	.attr("xmlns", "http://www.w3.org/2000/svg");
		var $svg = $(this).children("svg");
		$svg.context = "2d";
                var svg      = $svg.parent().html(),
                    b64      = Base64.encode(svg);

                $svg.after($("<a style='z-index:1000;position:absolute;bottom:2px;right:5px' id='dl"+ chartId +"' href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"'>Save as</a>"));
            }

function encode_as_img_and_link(){
 // Add some critical information
 $("svg").attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});
 
 var svg = $("#chartContainer-0").html();
 var b64 = Base64.encode(svg);
 
 // Works in recent Webkit(Chrome)
 $("body").append($("<img src='data:image/svg+xml;base64,\n"+b64+"' alt='file.svg'/>"));
 
 // Works in Firefox 3.6 and Webit and possibly any browser which supports the data-uri
 $("body").append($("<a href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"' title='file.svg'>Download</a>"));
}
**/

/*
	function svgtopng () {
		d3.select("#save").on("click", function() {
			//var html = d3.select("svg")
			var html = d3.select("#chartContainer-0").select("svg")
				.attr("version", 1.1)
				.attr("xmlns", "http://www.w3.org/2000/svg")
				.node().parentNode.innerHTML;

                var svg      = html.parent().html(),
                    b64      = Base64.encode(svg);
					
                html.after($("<a style='z-index:1000;position:absolute;bottom:2px;right:5px' id='dl"+ chartId +"' href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"'>Save as</a>"));
            }
);
}
            function encode_as_link(){
                var $svg = d3.select("#chartContainer-0").select("svg")
                // Add some critical information
                $svg.attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});

                var svg      = $svg.parent().html(),
                    b64      = Base64.encode(svg);

                $svg.after($("<a style='z-index:1000;position:absolute;bottom:2px;right:5px' id='dl"+ chartId +"' href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"'>Save as</a>"));
            }

            function removeLink(){
                var $anchor = $(this).children("a");
                $anchor.remove();
            }

			
            $chartDiv.hover(encode_as_link, removeLink);
				
				
/*			
	
			//console.log(html);
			var imgsrc = 'data:image/svg+xml;base64,' + btoa(encodeURIComponent(escape(html)));
			var img = '<img src="'+imgsrc+'">';
			d3.select("#chartContainer-0").append("svg") // TODO récupérer le nom du SVG (courant?)
				.attr("id", "png")
			d3.select("#chartContainer-0").html(img); // TODO récupérer le nom du SVG (courant?)
			

			var canvas = document.querySelector("canvas"),
			context = canvas.getContext("2d");

			var image = new Image;
			image.src = imgsrc;
			image.onload = function() {
				context.drawImage(image, 0, 0);

				//save and serve it as an actual filename
				binaryblob();

				var a = document.createElement("a");
				a.download = "sample.png"; // TODO: remplacer sample par nom du container ou nom du dataset.csv
				a.href = canvas.toDataURL("image/png");

				var pngimg = '<img src="'+a.href+'">'; 
				d3.select("#png").html(pngimg);

				a.click();
				};

			});
			
			function binaryblob(){
				var byteString = atob(document.querySelector("canvas").toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")); //wtf is atob?? https://developer.mozilla.org/en-US/docs/Web/API/Window.atob
				var ab = new ArrayBuffer(byteString.length);
				var ia = new Uint8Array(ab);
				for (var i = 0; i < byteString.length; i++) {
					ia[i] = byteString.charCodeAt(i);
				}
				var dataView = new DataView(ab);
				var blob = new Blob([dataView], {type: "image/png"});
				var DOMURL = self.URL || self.webkitURL || self;
				var newurl = DOMURL.createObjectURL(blob);

				var img = '<img src="'+newurl+'">'; 
				d3.select("#img").html(img);
			}
	}
*/

	function createHTMLdivs(configData, d, i) {
		
		var myContent = d3.select("#myContent")
		//	.append("div")
		//		.attr("class", "row")
				.append("div")
					//.attr("class", "col-md-12 bucket");
					.attr("class", "col-md-12 bucket")
					.style("font-size", "small");
		
		myContent.append("div")
			.attr("class", "col-md-12 question") 
			.attr("id", "question-" + i);
			// .style("border", "1px solid black");
		myContent.append("div")
			.attr("class", "col-md-12 answer")
			.attr("id", "answer-" + i);
			// .style("border", "1px solid black");
		myContent.append("div")
			.attr("class", "col-md-12 bemol")
			.attr("id", "bemol-" + i);
			// .style("border", "1px solid black");
		myContent.append("div")
			.attr("class", "col-md-12 chartContainer")
			.attr("id", "chartContainer-" + i)
			.style("border", "1px solid black");
		/*
		myContent.append("div")
			.attr("class", "col-md-2 kpi")
			.attr("id", "kpi-" + i)
			.style("border", "1px solid black");
		 myContent.append("div")
			.attr("class", "col-md-10 dataTable")
			.attr("id", "dataTable-" + i)
			.style("border", "1px solid black");
		myContent.append("div")
			.attr("class", "col-md-2 scope")
			.attr("id", "scope-" + i)
			.style("border", "1px solid black");
		*/
		myContent.append("div")
			.attr("class", "col-md-12 reco")
			.attr("id", "reco-" + i);
			// .style("border", "1px solid black");

	};


	function fillHTMLdivs(configData, d, i) {
		var headers = d3.keys(configData[0]);
		for (var j = 0; j < headers.length; j++) {
			(headers[j].substring(0,11) == "div_content") ? headerItem = headers[j].substring(11) : headerItem = headers[j];
			pushItem = "#" + headerItem + "-" + i;
			//contentItem = d[headers[j]];
			tempcontent = headers[j];
			contentItem = d[headers[j]];
			
			//contentItem = d[headers[j]]; // TODO : fix. Ne récupère pas les valeurs du fichier. headers[j] est ok, ça donne bien le nom du champ.
			//contentItem = configData[i,j];
			//alert(contentItem);
			if ($(pushItem).length > 0) {
				d3.select("#myContent").select(pushItem)
					.append("p")
							.text(contentItem);	
			}
		}
	};	


	function prepareDimpleChart(configData, d, i) {
		
		// déclare les variables locales utilisées pour définir chartConfig tenant compte d'adaptations.
		var finalContainer = [], finalBottom = [], finalLeft = [], isFilter = false, finalFilterValues = [], finalSvgWidth = [], finalSvgHeight = [], finalSvgUnit = [], dataMime = [],  chartDimple = [], chartSerie = [], nbSeries = [], chartVersion = [], isInverse = [], /* polyColors = [], */ chartPalette = [], isMarkers = [], isPercent = [], positionBottom = [], positionLeft = [], chartOrder = [], orderDesc = [], messagesConfig = [], umargin = [], lmargin = [], tmargin = [], rmargin = [], bmargin = [], alegend = [], xlegend = [], ylegend = [], wlegend = [], hlegend = [];
		

		// détermine la hauteur/largeur du svg accueillant le chartContainer.
		if (d.div_svgunit == "px" || d.div_svgunit == "%") {
			if (d.div_svgwidth != "") {
				finalSvgWidth = d.div_svgwidth;
				(d.div_svgheight != "") ? finalSvgHeight = d.div_svgheight : finalSvgHeight = finalSvgWidth;
				finalSvgUnit = d.div_svgunit;
			} else{
				if (d.div_svgheight != "") {
					finalSvgHeight = d.div_svgheight;
					finalSvgWidth = finalSvgHeight;
					finalSvgUnit = d.div_svgunit;
				} else{
					finalSvgWidth = 100;
					finalSvgHeight = 100;
					finalSvgUnit = "%";
				}
			}
		} else {
			finalSvgWidth = 100;
			finalSvgHeight = 100;
			finalSvgUnit = "%";
		}
		//alert("H : " + finalSvgHeight + " W : " + finalSvgWidth + " U : " + finalSvgUnit);
		// TODO essaie de récupérer la taille en pixels de la width afin de l'appliquer à la hauteur (qui elle n'est pas définie par Bootstrap) pour pouvoir appliquer un ratio largeur/hauteur. Cf Notes.txt.

		// si chartContainer est vide, affecte un nom par défaut.
		(d.chart_container == "") ? finalContainer = "chartContainer-" + i : finalContainer = d.chart_container;

		// teste si chartContainer est un élément DOM existant dans le HTML.
		var testContainer = "#" + finalContainer;
		if ($(testContainer).length != 1) {
			if ($(testContainer).length > 1) {
				alert("#" + finalContainer + " est en plusieurs exemplaires dans le HTML. \n Il ne peut y en avoir qu'un seul. STOP.");
				return; // sortie anticipée script
			} else{
				// affiche message d'erreur si le container qui doit accueillir le chart n'existe pas dans le HTML.
				alert("#" + finalContainer + " n'existe pas dans le HTML. \n Le graphe correspondant sera zappé.");
				return; // sortie anticipée script
			}
		}

		// détermine les margins (note: il est possible de mixer les unités pour un même margin : https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#setMargins)
		(d.chart_umargin == "%") ? umargin = "%" : umargin = "px";
		if (d.chart_lmargin != "" && d.chart_tmargin != "" && d.chart_rmargin != "" && d.chart_bmargin != "") {
			lmargin = d.chart_lmargin + umargin;
			tmargin = d.chart_tmargin + umargin;
			rmargin = d.chart_rmargin + umargin;
			bmargin = d.chart_bmargin + umargin;
		} else {
			lmargin = "100%";
			tmargin = "100%";
			rmargin = "100%";
			bmargin = "100%";
		}
		
		
		// détermine comment lire le fichier de données
		(d.data_delimiter == ",") ? dataMime = "text/csv" : dataMime = "text/plain"; // TODO : vérifier que "text/csv" s'applique forcément à tout fichier csv ayant pour séparateur des virgules, indépendamment des "" ou '' qu'il pourrait y avoir dans le fichier. Vérifier ce qui se passe si décimales avec des "." ou ",".
		
		// définit les formats de nombre et date/time.
		langUS = {
		"decimal": ".",
		"thousands": ",",
		"grouping": [3],
		"currency": ["$", ""],
		"dateTime": "%a %b %e %X %Y",
		"date": "%m/%d/%Y",
		"time": "%H:%M:%S",
		"periods": ["AM", "PM"],
		"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		"shortDays": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		"months": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		"shortMonths": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
		};
		
		langFR = {
		"decimal": ",",
		"thousands": " ",
		"grouping": [3],
		"currency": ["", "€"],
		"dateTime": "%Y-%m-%d %H:%M:%S.%L", // dans Quintessence : 2011-04-27 14:48:49.000
		"date": "%d/%m/%Y",
		"time": "%H:%M:%S",
		"periods": ["AM", "PM"],
		"days": ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
		"shortDays": ["Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam.", "Dim."],
		"months": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		"shortMonths": ["Janv.", "Fév.", "Mars", "Avr.", "Mai", "Juin", "Juil.", "Août", "Sept.", "Oct.", "Nov.", "Déc."]
		};
		
		
		// détermine s'il y a un filtre à appliquer sur les données selon ce qui est spécifié.
		(d.data_filterfield != "" && d.data_filtervalues != "") ? isFilter = true : isFilter = false;
		(d.data_filtervalues.substr(0,1) == "[") ? finalFilterValues = JSON.parse(d.data_filtervalues) : finalFilterValues = d.data_filtervalues;
		// si la valeur est de type ["critere1", "critère2"], c'est un objet, il faut la parser, sinon, c'est une chaîne, et c'est ok ("critere1").
		// TODO : Gérer filtre sur plusieurs axes (successions de filtres).
		
		// détermine le type du chart dans le langage "dimple" (affecte la version "bar" par défaut).
		(d.chart_type == "") ? chartType = "HIS" : chartType = d.chart_type; // affecte type de graphe par défaut.
		// (chartType == "ARE") ? chartDimple = "area" : chartDimple = "bar"; // cette ligne-là ne fonctionne pas (alors qu'elle est plus propre), "bar" est affecté même si c'est une "ARE".
		(chartType == "ARE" || "VAR") ? chartDimple = "area" : "bar";
		(chartType == "LIN") ? chartDimple = "line" : "bar";
		(chartType == "BAR" || chartType == "HIS") ? chartDimple = "bar" : "bar";
		(chartType == "RIN" || chartType == "PIE") ? chartDimple = "pie" : "bar";
		(chartType == "BUB" || chartType == "SCA") ? chartDimple = "bubble" : "bar";
		chartDimple = dimple.plot[chartDimple];
		
		// détermine la version du chart et la librairie par défaut.
		(d.chart_version == "") ? chartVersion = "simple" : chartVersion = d.chart_version;
		(d.chart_library == "") ? chartLibrary = "dimple" : chartLibrary = d.chart_library;
		
		// change l'opacité pour les aires.
		(d.chart_type == "ARE" || d.chart_type == "VAR") ? chartOpacity = 0.7 : chartOpacity = 0.8;
		
		// applique des points de données dans le graphe pour les aires, courbes, sauf si spécifié autrement.
		if (d.chart_markers == true) {
			(d.chart_type == "ARE" || d.chart_type == "BOX" || d.chart_type == "LIN" || d.chart_type == "RAD") ? isMarkers = true : isMarkers = false;
		} else{
			isMarkers = true;
		}

		// change la catégorie du graphe si chartGroup renseigné.
		(d.chart_baxisfield.substr(0,1) == "[") ? finalBottom = JSON.parse(d.chart_baxisfield) : finalBottom = d.chart_baxisfield;
		// DEPRECATED (d.chart_gaxisfield != "") ? finalBottom = JSON.parse(d.chart_gaxisfield) : finalBottom = d.chart_baxisfield;
		finalLeft = d.chart_laxisfield;
		
		// détermine la position de l'axe du bas ("category", ou "x") et de l'axe de gauche ("measure", ou "y").
		(chartType == "BAR" || chartType == "VAR") ? isInverse = true : isInverse = false;
		(chartType == "BAR" || chartType == "VAR") ? positionBottom = "y" : positionBottom = "x";
		(chartType == "BAR" || chartType == "VAR") ? positionLeft = "x" : positionLeft = "y";
		
		// détermine la série s'il y en a, à afficher.
		if (d.chart_serie != "") {
			if (d.chart_serie.substring(0,1) == "[") {
				// récupère un array de séries.
				chartSerie = JSON.parse(d.chart_serie);
				nbSeries = chartSerie.length;
			} else {
				chartSerie = d.chart_serie;
				nbSeries = 1;
			}
		} else {
			chartSerie = null;
			nbSeries = 0;
		}
		
		
		// détermine si l'axe de gauche ("measure" ou "y") doit être recalculé en proportion.
		(d.chart_version == "percent" || d.chart_version == "stacked-percent" || d.chart_version == "stacked-grouped-percent") ? isPercent = true : isPercent = false;
		(chartSerie != "" && isPercent == true) ? messagesConfig = messagesConfig + "\n" + finalContainer + " : ne devrait pas être affiché avec un axe à 100%, car il n'y a qu'une seule série." : "";
		
		// détermine le format des axes.
		(d.chart_laxisformat != "") ? formatLeft = d.chart_laxisformat : formatLeft = "";
		(d.chart_baxisformat != "") ? formatBottom = d.chart_baxisformat : formatBottom = "";
	
		// détermine si la légende doit être affichée.
		if (d.chart_serie == "") {
			(d.chart_legend == true) ? isLegend = true : isLegend = false;
			(isLegend == true) ? messagesConfig = messagesConfig + "\n" + finalContainer + ": il ne devrait pas y avoir de légende affichée, car il n'y a qu'une seule série." : "";
		} else { // plusieurs séries
			(d.chart_legend == false && d.chart_legend != "") ? isLegend = false : isLegend = true;
		}
		// position de la légende Note : On peut spécifier des séries à afficher dans la légende : https://github.com/PMSI-AlignAlytics/dimple/wiki/dimple.chart#addLegend)
		if (isLegend == true) {
			(d.chart_ulegend == "%") ? ulegend = "%" : ulegend = "px";
			if (d.chart_xlegend != "" && d.chart_ylegend != "" && d.chart_wlegend != "" && d.chart_hlegend != "") {
				xlegend = d.chart_xlegend + ulegend;
				ylegend = d.chart_ylegend + ulegend;
				wlegend = d.chart_wlegend + ulegend;
				hlegend = d.chart_hlegend + ulegend;
				(d.chart_alegend != "left" && d.chart_alegend != "right") ? alegend = "left" : alegend = d.chart_alegend;
			} else {
				xlegend = "70px"; // 5%
				ylegend = "5%";  // 5%
				wlegend = "90%"; // 92%
				hlegend = "20px"; // 10%
				alegend = "left";
				// slegend : séries à afficher.
			}
		}
		
		// détermine la position du titre du chart (en bas si vide).
		(d.chart_titleposition == "t") ? chartTitlePosition = -0.15 : chartTitlePosition = 1.25; // en pixels : top = -20 ; bottom = +480 et à ajouter (et non pas multiplier).
		
		// détermine si un ordre doit être appliqué sur les axes.
		// axe de gauche.
		if (d.chart_laxisorderfield != "") {
			(d.chart_laxisorderfield.substr(0,1) == "[") ? chartLeftOrderField = JSON.parse(d.chart_laxisorderfield) : chartLeftOrderField = d.chart_laxisorderfield;
			(d.chart_laxisorderdesc == "a" && d.chart_laxisorderdesc != "") ? chartLeftOrderDesc = true : chartLeftOrderDesc = false;
		} else{
			chartLeftOrderField = "";
			chartLeftOrderDesc = "";
		}
		// axe du bas.
		if (d.chart_baxisorderfield != "") {
			(d.chart_baxisorderfield.substr(0,1) == "[") ? chartBottomOrderField = JSON.parse(d.chart_baxisorderfield) : chartBottomOrderField = d.chart_baxisorderfield;
			(d.chart_baxisorderdesc == "a" && d.chart_baxisorderdesc != "") ? chartBottomOrderDesc = true : chartBottomOrderDesc = false;
		} else{
			chartBottomOrderField = "";
			chartBottomOrderDesc = "";
		}
		// série.
		if (d.chart_serieorderfield != "") {
			(d.chart_serieorderfield.substr(0,1) == "[") ? chartSerieOrderField = JSON.parse(d.chart_serieorderfield) : chartSerieOrderField = d.chart_serieorderfield;
			(d.chart_serieorderdesc == "d" && d.chart_serieorderdesc != "") ? chartSerieOrderDesc = false : chartSerieOrderDesc = true; // Inverse by default compared to axis.
		} else{
			chartSerieOrderField = "";
			chartSerieOrderDesc = "";
		}
		
		/**
		// axe de droite.
		if (d.chart_raxisorderfield != "") {
		alert("hi");
			(d.chart_raxisorderfield.substr(0,1) == "[") ? chartRightOrderField = JSON.parse(d.chart_raxisorderfield) : chartRightOrderField = d.chart_raxisorderfield;
			(d.chart_raxisorderdesc == "a" && d.chart_raxisorderdesc != "") ? chartRightOrderDesc = true : chartRightOrderDesc = false;
		} else{
			chartRightOrderField = "";
			chartRightOrderDesc = "";
		}
		// axe du haut.
		if (d.chart_taxisorderfield != "") {
			(d.chart_taxisorderfield.substr(0,1) == "[") ? chartTopOrderField = JSON.parse(d.chart_raxisorderfield) : chartTopOrderField = d.chart_taxisorderfield;
			(d.chart_taxisorderdesc == "a" && d.chart_taxisorderdesc != "") ? chartTopOrderDesc = true : chartTopOrderDesc = false;
		} else{
			chartTopOrderField = "";
			chartTopOrderDesc = "";
		}
**/
		//(d.chart_orderfield == true) ? chartOrder = d.chart_orderfield : "";
		
		// définit la palette de couleurs (poly vs mono).
		(d.chart_type == "HEA" || d.chart_type == "MAP" || d.chart_type == "TRE") ? chartPalette = "monocolor" : chartPalette = "polycolor";
		// NTH : définir la palette choisie et le contenu, ici plutôt que dans la procédure DrawDimpleChart. changer de palette selon viz.

		console.log(configData);		
		// cette façon de faire peut ne pas fonctionner dans tous les cas, mais a le mérite de laisser de la souplesse dans la construction du fichier de config. Si ça ne marche pas, définir myArray = [chartContainer, chartGroup, etc.]; puis appeler les éléments de myArray comme ça myArray[0]. Ca suppose que l'ordre des éléments du fichier de config manipulés soient toujours dans le même ordre. + d'infos : http://www.w3schools.com/js/js_arrays.asp
		chartConfig = { // seules les variables numériques et dates doivent être déclarées, les autres, c'est juste pour le debuggage. Déclarer toutes les variables qui ne sont pas dansd le fichier de config (çàd celles qui ont été retraitées).
		divSvgHeight: +d.div_svgheight,
		divSvgWidth: +d.div_svgwidth,
		divSvgUnit: d.div_svgunit,
		
		divQuestion: d.div_contentquestion,
		divAnswer: d.div_contentanswer,
		divBemol: d.div_contentbemol,
		divKpi: d.div_contentkpi,
		divScope: d.div_contentscope,
		divReco: d.div_contentreco,

		chartDraw: d.chart_draw,
		chartContainer: d.chart_container,
		dataFile: d.data_file,
		dataDelimiter: d.data_delimiter,
		filterValues: d.data_filtervalues,
		filterField: d.data_filterfield,
		chartTitle: d.chart_title, // dans le graphe (titre précis mais petit) !
		chartTitlePosition: +chartTitlePosition,
		chartMarginUnit: d.chart_umargin,
		chartMarginLeft: +d.chart_lmargin,
		chartMarginTop: +d.chart_tmargin,
		chartMarginRight: +d.chart_rmargin,
		chartMarginBottom: +d.chart_bmargin,
		chartLeft: d.chart_laxisfield,
		chartLeftType: d.chart_laxistype,
		chartLeftFormat: d.chart_laxisformat,
		chartTitleLeft: d.chart_laxistitle,
		chartBottom: d.chart_baxisfield,
		chartBottomType: d.chart_baxistype,
		chartBottomFormat: d.chart_baxisformat,
		chartTitleBottom: d.chart_baxistitle,
		chartGroup: d.chart_gaxisfield,
		//chartOrder: d.chart_orderfield,
		chartLegend: +d.chart_legend,
		chartLegendPosX: +d.chart_xlegend,
		chartLegendPosY: +d.chart_ylegend,
		chartLegendHeight: +d.chart_hlegend,
		chartLegendWidth: +d.chart_wlegend,
		chartLegendAlignment: d.chart_alegend,
		
		chartLibrary: chartLibrary,
		chartVersion: chartVersion,
		chartType: chartType,
		chartSerie: chartSerie,
		nbSeries: nbSeries,
		isLegend: isLegend,
		isMarkers: isMarkers,
		isPercent: isPercent,
		isFilter: isFilter,
		isInverse: isInverse,
		//isOrder: isOrder,
		finalContainer: finalContainer,
		chartDimple: chartDimple,
		finalBottom: finalBottom,
		finalLeft: finalLeft,
		finalFilterValues: finalFilterValues,
		finalSvgWidth: finalSvgWidth,
		finalSvgHeight: finalSvgHeight,
		finalSvgUnit: finalSvgUnit,
		dataMime: dataMime,
		chartOpacity: chartOpacity, // rajouter + devant ?
		/*polyColors: [polyColors]*/
		chartPalette: chartPalette,
		positionBottom: positionBottom,
		formatBottom: formatBottom,
		positionLeft: positionLeft,
		formatLeft: formatLeft,
		chartLeftOrderField: chartLeftOrderField,
		chartLeftOrderDesc: chartLeftOrderDesc,
		chartBottomOrderField: chartBottomOrderField,
		chartBottomOrderDesc: chartBottomOrderDesc,
		chartSerieOrderField: chartSerieOrderField,
		chartSerieOrderDesc: chartSerieOrderDesc,
		umargin: umargin,
		lmargin: lmargin,
		tmargin: tmargin,
		rmargin: rmargin,
		bmargin: bmargin,
		alegend: alegend,
		xlegend: xlegend,
		ylegend: ylegend,
		wlegend: wlegend,
		hlegend: hlegend,
		/*
		chartRightOrderField: chartRightOrderField,
		chartRightOrderDesc: chartRightOrderDesc,
		chartTopOrderField: chartTopOrderField,
		chartTopOrderDesc: chartTopOrderDesc,
		*/
		
		//chartOrder: [chartOrder],
		//orderDesc: orderDesc,
		messagesConfig: messagesConfig
		
		// TODO : déclarer par défaut des champs de type date, et des champs de type numérique (via le nom des champs ?).
		
		}; // chartConfig est un objet.
		
		return chartConfig;
	}


	// créer fonction de préparation des datas : reconnaît les types de champs, extrait leur nom par défaut (supprime le suffixe), applique la localisation, etc.), gère le type, mime, etc. MAIS PAS LES FILTRES => car c'est dans chaque graphe différent (or ça peut être même fichier) - OU PAS ??.
	
	// ET SI j'essayais d'appeler fonction de prépa data depuis la procédure de création de graphe dimple.
	
	function prepareData(configData, d, i, chartConfig, data) {
		//data = [];
		dataPrepared = ["truc", "bidule"];
			var parseDate = d3.time.format("%d/%m/%Y").parse;
			alert(data);
			/*
			data.forEach(function (d) {
				//alert("d: " + d);
				//var format = d3.time.format("%Y-%m-%d");
				d.Date = parseDate(d.Date);
				d.Volume = +d.Volume;
				
			});
			*/
		
			// applique un filtre sur les données si spécifié dans le fichier de config.
			//(chartConfig["isFilter"] == true) ? data = dimple.filterData(data, chartConfig["filterField"], chartConfig["finalFilterValues"]) : "";
			
			// data = dimple.filterData(data, "Owner", ["Aperture", "LexCorp"]); // on peut ajouter autant de filtres que souhaités (TODO vérifier les valeurs).
			// data = dimple.filterData(data, chartConfig["filterField"], chartConfig["finalFilterValues"]) 
			// data = dimple.filterData(data, "Owner", ["Aperture", "LexCorp"])
		
		//dataPrepared = [data];
		//alert(dataPrepared[2]);
		//return dataPrepared;
		//data = JSON.parse(data);
		alert(dataPrepared);
		//alert(data);
		return data;
		}

	
function drawDimpleChart(configData, d, i, chartConfig) {
			
			//** alert(+d.chart_draw == 1);
			//** alert(d.chart_draw == "");
			if (+d.chart_draw == 1 || d.chart_draw == "") { // zappe la création de chart si spécifié.
			
			//** alert("chartContainer: " + chartConfig["chartContainer"] + "\n" + "chartBottom: " + chartConfig["chartBottom"] + "\n" + "chartLeft: " + chartConfig["chartLeft"] + "\n" + "chartSerie: " + chartConfig["chartSerie"] + "\n" + "chartType: " + chartConfig["chartType"] + "\n" + "chartDimple: " + chartConfig["chartDimple"]); // ça marche !
			console.log(chartConfig);

			var svg = dimple.newSvg("#" + chartConfig["finalContainer"], chartConfig["finalSvgWidth"] + chartConfig["finalSvgUnit"], chartConfig["finalSvgHeight"] + chartConfig["finalSvgUnit"]);
			
			var dsv = d3.dsv(chartConfig["dataDelimiter"], chartConfig["dataMime"]);
			dsv(chartConfig["dataFile"], function (data) {
				var myChart = new dimple.chart(svg, data);
				// définit les marges du chart
				myChart.setMargins(chartConfig["lmargin"], chartConfig["tmargin"], chartConfig["rmargin"], chartConfig["bmargin"]);
				var b = [], l = [], s = [], r = [], t = [];
				// définit l'axe du bas
				(chartConfig["chartBottomType"] == "time") ? b = myChart.addTimeAxis(chartConfig["positionBottom"], chartConfig["finalBottom"], "%d/%m/%Y", "%a") : b = myChart.addCategoryAxis(chartConfig["positionBottom"], chartConfig["finalBottom"]);
				(d.chart_baxisorderfield != "") ? b.addOrderRule(chartConfig["chartBottomOrderField"], chartConfig["chartBottomOrderDesc"]) : "";
				//(d.chart_baxisformat != "") ? b.tickFormat = d.chart_baxisformat : "";
				(d.chart_baxistitle != "") ? b.title = d.chart_baxistitle : "";
				b.ticks = 5;
				// définit l'axe de gauche
				(chartConfig["isPercent"] == true) ? l = myChart.addPctAxis(chartConfig["positionLeft"], chartConfig["chartLeft"]) : l = myChart.addMeasureAxis(chartConfig["positionLeft"], chartConfig["chartLeft"]);
				(d.chart_laxisorderfield != "") ? l.addOrderRule(chartConfig["chartLeftOrderField"], chartConfig["chartLeftOrderDesc"]) : "";
				(d.chart_laxisformat != "") ? l.tickFormat = d.chart_laxisformat : "";
				(d.chart_laxistitle != "") ? l.title = d.chart_laxistitle : "";
				l.ticks = 5;
				// définit les séries
				if (chartConfig["nbSeries"] > 1) {
				var allSeries = chartConfig["chartSerie"];
					for (k = 0; k < chartConfig["nbSeries"]; k++) {
						var tempSerie = allSeries[k];
						var search = "'", replace = '"';
						tempSerie2 = tempSerie.replaceAll(search, replace);
						alert(tempSerie2); // TODO : tempSerie n'est pas un objet !, or il faudrait.
						tempSerie = JSON.parse(tempSerie);
						alert(tempSerie);
						//myChart.addSeries(tempSerie);
						// TODO : trouver le moyen de nommer la variable en dynamique.
						varSerie = window['s' + k];
						window['s' + k] = myChart.addSeries(tempSerie);
					}
				} else {
					s = myChart.addSeries(chartConfig["chartSerie"], chartConfig["chartDimple"]);
				}
				// Gère le format des Referenced.
			//floatingSeries.stacked = false;
			//s1.stacked = false;
			// Set a narrower stacked bar
			//stackedSeries.barGap = 0.3;
			//s0.barGap = 0.3;
			// Set the bar height
			//yyAxis.floatingBarWidth = 10;
			//yyAxis.floatingBarWidth = 10;
			// Set a specific colour for the floating bars
			//myChart.assignColor("Floating", "black", "black", 0.6);
			//myChart.assignColor("Floating", "black", "black", 0.6);
				
				
				
				
				/**
				// définit la série
				s = myChart.addSeries(chartConfig["chartSerie"], chartConfig["chartDimple"]);
				(d.chart_serieorderfield != "") ? s.addOrderRule(chartConfig["chartSerieOrderField"], chartConfig["chartSerieOrderDesc"]) : ""; // TODO OrderGroup
				(chartConfig["isMarkers"] == true) ? s.lineMarkers = true : "";
				**/
				// applique la légende
				(chartConfig["isLegend"] == true) ? myChart.addLegend(chartConfig["xlegend"], chartConfig["ylegend"], chartConfig["wlegend"], chartConfig["hlegend"], chartConfig["alegend"]) : "";
				/* NTH appliquer la palette en une seule instruction.
				myChart.defaultColors = new dimple.color(chartConfig["polyColors"]);
				*/
				// applique palette de couleurs
				if (chartConfig["chartPalette"] == "monocolor") {
					myChart.defaultColors = [
						new dimple.color("#B4EBF5", "#B4EBF5", chartConfig["chartOpacity"]),
						new dimple.color("#8ED4FA", "#8ED4FA", chartConfig["chartOpacity"]),
						new dimple.color("#00539F", "#00539F", chartConfig["chartOpacity"]),
						new dimple.color("#27B9E9", "#27B9E9", chartConfig["chartOpacity"]),
						new dimple.color("#2B99D3", "#2B99D3", chartConfig["chartOpacity"]),
						new dimple.color("#3C81B5", "#3C81B5", chartConfig["chartOpacity"]),
						new dimple.color("#292E3A", "#292E3A", chartConfig["chartOpacity"])
					];
				}
				else{
					myChart.defaultColors = [
						new dimple.color("#A8CAD6", "#A8CAD6", chartConfig["chartOpacity"]),
						new dimple.color("#FF6418", "#FF6418", chartConfig["chartOpacity"]),
						new dimple.color("#00539F", "#00539F", chartConfig["chartOpacity"]),
						new dimple.color("#FFB60F", "#FFB60F", chartConfig["chartOpacity"]),
						new dimple.color("#27B9E9", "#27B9E9", chartConfig["chartOpacity"]),
						new dimple.color("#EB2651", "#EB2651", chartConfig["chartOpacity"]),
						new dimple.color("#85D9D3", "#85D9D3", chartConfig["chartOpacity"]),
						new dimple.color("#66BC29", "#66BC29", chartConfig["chartOpacity"]),
						new dimple.color("#CFD2D7", "#CFD2D7", chartConfig["chartOpacity"]),
						new dimple.color("#292E3A", "#292E3A", chartConfig["chartOpacity"])
					];
				}
				/**
				// ajoute le titre du graphe au svg avec D3.
				svg.append("text")
					.attr("x", myChart._xPixels() + myChart._widthPixels() / 2)
					.attr("y", myChart._yPixels() + myChart._heightPixels() * chartConfig["chartTitlePosition"])
					.style ("text-anchor", "middle")
					.style ("font-size", "10px")
					.text(chartConfig["chartTitle"]);
				**/
				// dessine le graphe.
				myChart.draw();
				// redessine le chart si changement de taille de fenêtre
				window.onresize = function () {
					myChart.draw(0, true);
				};
				// affiche messages d'erreur.
				//** (chartConfig["messagesConfig"] != "") ? alert(chartConfig["messagesConfig"]) : "";
				(chartConfig["messagesConfig"] != "") ? console.warn(chartConfig["messagesConfig"]) : "";
			});
			
		} else{
		console.warn("#" + chartConfig["finalContainer"] +" est désactivé. (chartDraw = 0).");
		} 
	}

	
	function drawD3Chart(configData, d, i, chartConfig) {
	//**alert("Go for D3 ! " + i);
	
	switch(chartConfig["chartType"]) {
		case "SAN":
			alert("sankey");
			//var width = document.getElementById(myContainer).offsetWidth;
			//var height = document.getElementById(myContainer).offsetHeight;
				// Code from Bostock
				var margin = {top: 10, right: 10, bottom: 10, left: 10}, // var margin = {top: 1, right: 1, bottom: 6, left: 1},
					width = 1400 - margin.left - margin.right, // width = 960 - margin.left - margin.right,
					height = 740 - margin.top - margin.bottom; // height = 500 - margin.top - margin.bottom;
				// need to specify width/height in relative
				
				var SankeyUnit = d.SAN_unit;
				var formatNumber = d3.format(" .0f"),
				//var formatNumber = d3.format(",.0f"),
				//var formatNumber = d3.format(d.SAN_formatnumber),
					// format = function(d) { return formatNumber(d) + " TWh"; },
					format = function(d) { return "Volume: " + formatNumber(d) + " " + SankeyUnit; },
					color = d3.scale.category20();
				
				// Append the svg canvas to the page
				var svg = d3.select("#chartContainer-0").append("svg")
				//var svg = d3.select(chartConfig["finalContainer"]).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
				// Set the sankey diagram properties
				var sankey = d3.sankey()
					.nodeWidth(15) // 36 ?
					.nodePadding(10)
					.size([width, height]);

				var path = sankey.link();

				var dsv = d3.dsv(chartConfig["dataDelimiter"], chartConfig["dataMime"]);
				dsv(chartConfig["dataFile"], function (error, data) {		
				
				// Specific to CSV
					//set up graph in same style as original example but empty
					graph = {"nodes" : [], "links" : []};
			  
							data.forEach(function (d) {
								graph.nodes.push({ "name": d.source });
								graph.nodes.push({ "name": d.target });
								graph.links.push({ "source": d.source, "target": d.target, "value": +d.value });
							});

							//thanks Mike Bostock https://groups.google.com/d/msg/d3-js/pl297cFtIQk/Eso4q_eBu1IJ
							//this handy little function returns only the distinct / unique nodes
							graph.nodes = d3.keys(d3.nest()
									 .key(function (d) { return d.name; })
									 .map(graph.nodes));

							//it appears d3 with force layout wants a numeric source and target
							//so loop through each link replacing the text with its index from node
							graph.links.forEach(function (d, i) {
								graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
								graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
							});

							//now loop through each nodes to make nodes an array of objects rather than an array of strings
							graph.nodes.forEach(function (d, i) {
								graph.nodes[i] = { "name": d };
							});
				// End specific csv
				
				  sankey
					  .nodes(graph.nodes)
					  .links(graph.links)
					  .layout(32);

				  var link = svg.append("g").selectAll(".link")
					  .data(graph.links)
					.enter().append("path")
					  .attr("class", "link")
					  .attr("d", path)
					  .style("stroke-width", function(d) { return Math.max(1, d.dy); })
					  .sort(function(a, b) { return b.dy - a.dy; });

				  link.append("title")
					  .text(function(d) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });
					  //.text(function(d) { return "Flow: " + d.source.name + " → " + d.target.name + "\n" + format(d.value); });

				  var node = svg.append("g").selectAll(".node")
					  .data(graph.nodes)
					.enter().append("g")
					  .attr("class", "node")
					  .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
					.call(d3.behavior.drag()
					  .origin(function(d) { return d; })
					  .on("dragstart", function() { this.parentNode.appendChild(this); })
					  .on("drag", dragmove));

				  node.append("rect")
					  .attr("height", function(d) { return d.dy; })
					  .attr("width", sankey.nodeWidth())
					  .style("fill", function(d) { return d.color = color(d.name.replace(/ .*/, "")); })
					  .style("stroke", function(d) { return d3.rgb(d.color).darker(2); })
					.append("title")
					  .text(function(d) { return d.name + "\n" + format(d.value); });
					  //.text(function(d) { return "Category: " + d.name + "\n" + "Volume: " + format(d.value); });

				  node.append("text")
					  .attr("x", -6)
					  .attr("y", function(d) { return d.dy / 2; })
					  .attr("dy", ".35em")
					  .attr("text-anchor", "end")
					  .attr("transform", null)
					  .text(function(d) { return d.name; })
					  //.text(function(d) { return "Category :" + d.name; })
					.filter(function(d) { return d.x < width / 2; })
					  .attr("x", 6 + sankey.nodeWidth())
					  .attr("text-anchor", "start");

				  function dragmove(d) {
					d3.select(this).attr("transform", "translate(" + d.x + "," + (d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))) + ")");
					sankey.relayout();
					link.attr("d", path);
				  }
				
				// Add a title to svg with D3 // Marche pas
				
				/* graph.append("text")
				
					.attr("x", sankey._xPixels() + sankey._widthPixels() / 2)
					.attr("y", sankey._yPixels() + 480) // ou - 20 si au top
					.style("text-anchor", "middle")
					.style("font-family", "sans-serif")
					.style("font-size", "0.65em")
					.text("bla")
				
				*/
				});
		break; // </sankey>
	} // </switch>
	
	}

String.prototype.replaceAll = function(search, replace) {
    if (replace === undefined) {
        return this.toString();
    }
    return this.split(search).join(replace);
}

	
/** A FAIRE **

=== DIMPLE ===
- Rajouter bordures plus foncée sur les aires (rajouter une série ??)
- Gérer dimple quatre axes
- Gérer filtre de données à multiples critères
- Gérer la concordance entre baxisfield et gaxisfield, et l'ordre correct et cohérent entre les deux settings (ORDER).
- Voir pourquoi la légende ne se définit pas correctement (marges, et ordre des éléments)
- Ask Stackoverflow sur l'aire multiple (l'une devant l'autre)



=== LAYOUT ===
- Rajouter une zone où on a le nom du fichier du dataset (masquée ?)
- S'appuyer sur des templates de bucket ?
- Avoir plusieurs chartContainer dans un bucket
- Gérer le rapport hauteur/largeur du SVG (en récupérant la hauteur/largeur de l'élément DOM parent


=== D3 ===
[FORCE]
- Afficher le nom des bulles
- Affecter une couleur aux bulles : par groupe
									par bulle (chacune une couleur différente)
									toutes la même couleur
- Afficher ou non les markers (flèches)
- Taille des liens fonction du volume ???
- Taille des bulles fonction du volume
- Intensité couleur des bulles fonction du volume (même couleur)
- Afficher infobulle sur lien
- Possibilité de fixer la position des bulles
- Overrider la position et taille de la légende selon qu'il y a un axe à droite ou en haut.


=== MISC ===
- Change timeframe with radio-buttons (different columns ??)
- Save as image PNG
- Export dataset
- Try a design that looks like info + design (big numbers, chart full screen)
- Skip visu but not bucket





** DONE **
- Fusionner baxisfield et gaxisfield ???
- Définir les margin via fichier de config (là, c'est en dur)
- Légende corrigée et paramétrable

**/