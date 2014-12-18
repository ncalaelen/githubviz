// Placer ici scripts manuels.

function drawManualChart(pageName) {
	switch(pageName) {
		case "dashboard3" :
		
			var myChart1 = [];
			var svg1 = dimple.newSvg("#chartContainer-1", "100%", "100%");
			var dsv = d3.dsv(";", "text/plain");
			dsv("data/visiteurs.csv", function (data) {	
				var myChart1 = new dimple.chart(svg1, data);
				myChart1.setMargins("70px", "70px", "70px", "100px")
				var x = myChart1.addCategoryAxis("x", "Date");
				x.addOrderRule("d_Date");
				//x.tickFormat = "%a";
				x.title = "Semaine passée";
				var y = myChart1.addMeasureAxis("y", "Volume");
				var y2 = myChart1.addMeasureAxis("y", "Auth");
				y.title = "Visiteurs (milliers)";
				y2.title = "Visiteurs authentifiés (%)";
				y2.tickFormat = "%";
				var s = myChart1.addSeries("Tous visiteurs", dimple.plot.bar, [x, y]);
				var s2 = myChart1.addSeries("Authentifiés", dimple.plot.line, [x, y2]);
				s2.lineMarkers = true;
				myChart1.addLegend("8%", "5%", "90%", "5%", "right");					
				// svg1.append("text")
					// .attr("x", myChart1._xPixels() + myChart1._widthPixels() / 2)
					// .attr("y", myChart1._yPixels() + myChart1._heightPixels() * (1.25))
					// .style("text-anchor", "middle")
					// .style("font-size", "10px")
					// .text("Audience de la semaine passée, tous sites confondus Le Parisien");
				myChart1.defaultColors = [
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
				//myChart1.assignColor("p_Auth", "red", "red", 1);
				//myChart1.assignColor("p_Auth", "red", "red", 1);
				myChart1.draw();
			});
			/*
			// Add a method to draw the chart on resize of the window
			window.onresize = function () {
				myChart1.draw(0, true);
			};
			*/
		break; // <dashboard3>
		
		case "configtest5" :
		break; // <configtest5>
		
		case "force" : // Il faut updater chartConfig dans nbelnet.js pour que ce soit industrialisable.
			chartConfig = {
			dataFile: "data/force2.csv",
			dataDelimiter: ";",
			finalSvgWidth: 100,
			finalSvgHeight: 100,
			finalSvgUnit: "%",
			dataMime: "text/plain",
			finalContainer:"chartContainer-0",
			FOR_linkDistance: 120,
			FOR_charge: -600, // -300
			FOR_radius: 12,
			FOR_radiusFocus: 22,
			FOR_markerWidth: 6,
			FOR_markerHeight: 6,
			FOR_color: "all",
			};
		
			// get the data
			var myChart = [];
			var svg = dimple.newSvg("#" + chartConfig["finalContainer"], chartConfig["finalSvgWidth"] + chartConfig["finalSvgUnit"], chartConfig["finalSvgHeight"] + chartConfig["finalSvgUnit"]);
			var dsv = d3.dsv(chartConfig["dataDelimiter"], chartConfig["dataMime"]);
			dsv(chartConfig["dataFile"], function (error, links) {	
			 
			var nodes = {};
			 
			// Compute the distinct nodes from the links.
			links.forEach(function(link) {
				link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
				link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
				link.value = +link.value;
			});
			 

			width = $("#" + chartConfig["finalContainer"]).width();
			height = $("#" + chartConfig["finalContainer"]).height();
			color = d3.scale.category20c();

			 
			var force = d3.layout.force()
				.nodes(d3.values(nodes))
				.links(links)
				.size([width, height])
				//.linkDistance(60)
				//.linkDistance(160)
				.linkDistance(chartConfig["FOR_linkDistance"])
				.charge(chartConfig["FOR_charge"])
				.on("tick", tick)
				.start();
			 
			// Set the range
			var  v = d3.scale.linear().range([0, 100]);
			 
			// Scale the range of the data
			v.domain([0, d3.max(links, function(d) { return d.value; })]);
			 
			// asign a type per value to encode opacity
			links.forEach(function(link) {
				if (v(link.value) <= 25) {
					link.type = "twofive";
				} else if (v(link.value) <= 50 && v(link.value) > 25) {
					link.type = "fivezero";
				} else if (v(link.value) <= 75 && v(link.value) > 50) {
					link.type = "sevenfive";
				} else if (v(link.value) <= 100 && v(link.value) > 75) {
					link.type = "onezerozero";
				}
			});
			 

			// build the arrow.
			svg.append("svg:defs").selectAll("marker")
				 .data(["end"])      // Different link/path types can be defined here
				//.data(["suit", "licensing", "resolved"])      // Different link/path types can be defined here
			  .enter().append("svg:marker")    // This section adds in the arrows
				.attr("id", String)
				//.attr("id", function(d) { return d; })
				.attr("viewBox", "0 -5 10 10")
				.attr("refX", chartConfig["FOR_radius"] + 10) // FOR_radius + something (n px)
				//.attr("refY", -1.5)
				.attr("refY", -1.5)
				.attr("markerWidth", chartConfig["FOR_markerWidth"])
				.attr("markerHeight", chartConfig["FOR_markerHeight"])
				.attr("orient", "auto")
			  .append("svg:path")
				.attr("d", "M0,-5L10,0L0,5");
			 
			// add the links and the arrows
			var path = svg.append("svg:g").selectAll("path")
				.data(force.links())
			  .enter().append("svg:path")
				.attr("class", function(d) { return "link " + d.type; })
				// .attr("marker-end", "url(#end)");
				.attr("marker-end", (chartConfig["FOR_color"] == "all") ? "black" : function(d) { return "url(#" + d.type + ")"; }); // enlève les arrows quand on active cette ligne.
			 
			// define the nodes
			var node = svg.selectAll(".node")
				.data(force.nodes())
			  .enter().append("g")
				.attr("class", "node")
				.on("click", click)
				.on("dblclick", dblclick)
				.call(force.drag);
			 
			// add the nodes
			node.append("circle")
				.attr("r", chartConfig["FOR_radius"]) // 5, ou 15
				//.style("fill", function(d) { return color(d.name); });
				.style("fill", function(d) { return color(d.name); });

			 
			// add the text 
			node.append("text")
				.attr("x", 12)
				.attr("dy", ".35em")
				.text(function(d) { return d.name; });
			 
			// add the curvy lines
			function tick() {
				path.attr("d", function(d) {
					var dx = d.target.x - d.source.x,
						dy = d.target.y - d.source.y,
						dr = Math.sqrt(dx * dx + dy * dy);
					return "M" + 
						d.source.x + "," + 
						d.source.y + "A" + 
						dr + "," + dr + " 0 0,1 " + 
						d.target.x + "," + 
						d.target.y;
				});
			 
				node
					.attr("transform", function(d) { 
						return "translate(" + d.x + "," + d.y + ")"; });
			}
			
			// action to take on mouse click
			function click() {
				d3.select(this).select("text").transition()
					.duration(750)
					.attr("x", 22)
					//.style("stroke", "lightsteelblue")
					//.style("stroke-width", ".5px")
					.style("font", "20px sans-serif");
				d3.select(this).select("circle").transition()
					.duration(750)
					.attr("r", chartConfig["FOR_radiusFocus"]);
			}
			 
			// action to take on mouse double click
			function dblclick() {
				d3.select(this).select("circle").transition()
					.duration(750)
					.attr("r", chartConfig["FOR_radius"]);
				d3.select(this).select("text").transition()
					.duration(750)
					.attr("x", 12)
					.style("stroke", "none")
					.style("fill", "black")
					.style("stroke", "none")
					.style("font", "10px sans-serif");
			}
			 
			});
		
		break; // <force>
		
		case "force2" :
			/**
			* do the force vizualization
			* @param {string} divName name of the div to hold the tree
			* @param {object} inData the source data
			*/
			function doTheTreeViz(divName, inData) {
			// tweak the options
			var options = $.extend({
			 stackHeight : 12,
			 radius : 5,
			 fontSize : 12,
			 labelFontSize : 8,
			 nodeLabel : null,
			 markerWidth : 0,
			 markerHeight : 0,
			 width : $(divName).outerWidth(),
			 gap : 1.5,
			 nodeResize : "",
			 linkDistance : 30,
			 charge : -120,
			 styleColumn : null,
			 styles : null,
			 linkName : null,
			 height : $(divName).outerHeight()
			}, inData.d3.options);
			// set up the parameters
			options.gap = options.gap * options.radius;
			var width = options.width;
			var height = options.height;
			var data = inData.d3.data;
			var nodes = data.nodes;
			var links = data.links;
			var color = d3.scale.category20();

			var force = d3.layout.force().nodes(nodes).links(links).size([width, height]).linkDistance(options.linkDistance).charge(options.charge).on("tick", tick).start();

			var svg = d3.select(divName).append("svg:svg").attr("width", width).attr("height", height);

			// get list of unique values in stylecolumn
			linkStyles = [];
			if (options.styleColumn) {
			 var x;
			 for (var i = 0; i < links.length; i++) {
			  if (linkStyles.indexOf( x = links[i][options.styleColumn].toLowerCase()) == -1)
			   linkStyles.push(x);
			 }
			} else
			 linkStyles[0] = "defaultMarker";

			// do we need a marker?

			if (options.markerWidth) {
			 svg.append("svg:defs").selectAll("marker").data(linkStyles).enter().append("svg:marker").attr("id", String).attr("viewBox", "0 -5 10 10").attr("refX", 15).attr("refY", -1.5).attr("markerWidth", options.markerWidth).attr("markerHeight", options.markerHeight).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5");
			}

			var path = svg.append("svg:g").selectAll("path").data(force.links()).enter().append("svg:path").attr("class", function(d) {
			 return "link " + (options.styleColumn ? d[options.styleColumn].toLowerCase() : linkStyles[0]);
			}).attr("marker-end", function(d) {
			 return "url(#" + (options.styleColumn ? d[options.styleColumn].toLowerCase() : linkStyles[0] ) + ")";
			});

			var circle = svg.append("svg:g").selectAll("circle").data(force.nodes()).enter().append("svg:circle").attr("r", function(d) {
			 return getRadius(d);
			}).style("fill", function(d) {
			 return color(d.group);
			}).call(force.drag);

			if (options.nodeLabel) {
			 circle.append("title").text(function(d) {
			  return d[options.nodeLabel];
			 });
			}

			if (options.linkName) {
			 path.append("title").text(function(d) {
			  return d[options.linkName];
			 });
			}
			var text = svg.append("svg:g").selectAll("g").data(force.nodes()).enter().append("svg:g");

			// A copy of the text with a thick white stroke for legibility.
			text.append("svg:text").attr("x", options.labelFontSize).attr("y", ".31em").attr("class", "shadow").text(function(d) {
			 return d[options.nodeLabel];
			});

			text.append("svg:text").attr("x", options.labelFontSize).attr("y", ".31em").text(function(d) {
			 return d[options.nodeLabel];
			});
			function getRadius(d) {
			 return options.radius * (options.nodeResize ? Math.sqrt(d[options.nodeResize]) / Math.PI : 1);
			}

			// Use elliptical arc path segments to doubly-encode directionality.
			function tick() {
			 path.attr("d", function(d) {
			  var dx = d.target.x - d.source.x, dy = d.target.y - d.source.y, dr = Math.sqrt(dx * dx + dy * dy);
			  return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
			 });

			 circle.attr("transform", function(d) {
			  return "translate(" + d.x + "," + d.y + ")";
			 });

			 text.attr("transform", function(d) {
			  return "translate(" + d.x + "," + d.y + ")";
			 });
			}

			}
		break; // <force2>
		
		case "force3" : // sticked
		
			var width = 960,
			height = 500;
			
			var myChart = [];
			var svg = dimple.newSvg("#chartContainer-0", "100%", "100%");
	

			var force = d3.layout.force()
				.size([width, height])
				.charge(-400)
				.linkDistance(40)
				.on("tick", tick);

			var drag = force.drag()
				.on("dragstart", dragstart);

			// var svg = d3.select("body").append("svg")
				// .attr("width", width)
				// .attr("height", height);

			var link = svg.selectAll(".link"),
				node = svg.selectAll(".node");

			d3.json("data/graph.json", function(error, data) {
			  force
				  .nodes(data.nodes)
				  .links(data.links)
				  .start();
				  	  
			  link = link.data(data.links)
				.enter().append("line")
				  .attr("class", "link");

			  node = node.data(data.nodes)
				.enter().append("circle")
				  .attr("class", "node")
				  .attr("r", 12)
				  .on("dblclick", dblclick)
				  .call(drag);
			});

			function tick() {
			  link.attr("x1", function(d) { return d.source.x; })
				  .attr("y1", function(d) { return d.source.y; })
				  .attr("x2", function(d) { return d.target.x; })
				  .attr("y2", function(d) { return d.target.y; });

			  node.attr("cx", function(d) { return d.x; })
				  .attr("cy", function(d) { return d.y; });
			}

			function dblclick(d) {
			  d3.select(this).classed("fixed", d.fixed = false);
			}

			function dragstart(d) {
			  d3.select(this).classed("fixed", d.fixed = true);
			}

		
		break; // <force3>
		
		default: // all other cases than previously mentioned.
		break;
	}
}