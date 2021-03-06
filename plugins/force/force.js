"use strict";

(function () {
  /*
   * Federated Wiki : Force Plugin
   *
   * Licensed under the MIT license.
   * https://github.com/fedwiki/wiki-plugin-force/blob/master/LICENSE.txt
   */
  window.plugins.force = {
    bind: function bind(div, item) {},
    emit: function emit(div, item) {
      return wiki.getScript('/js/d3/d3.min.js', function () {
        var candidates, data, fill, force, h, json, link, node, vis, w, who;
        div.append("<style type=\"text/css\">\n  circle.node {\n    stroke: #fff;\n    stroke-width: 1.5px;\n  }\n\n  line.link {\n    stroke: #999;\n    stroke-opacity: .6;\n  }\n</style>");
        w = 380;
        h = 230;
        candidates = $(".item:lt(".concat($('.item').index(div), ")"));

        if ((who = candidates.filter(".force-source:last")).size()) {
          data = who.get(0).forceData();
        } else {
          data = wiki.getData();
        }

        json = $.extend(true, {}, data);
        console.log(json);
        fill = d3.scale.category20();
        vis = d3.select(div.get(0)).append("svg:svg").attr("width", w).attr("height", h);
        vis.append("svg:defs").selectAll("marker").data(["arrowhead"]).enter().append("svg:marker").attr("id", String).attr("viewBox", "0 0 10 10").attr("refX", "20").attr("refY", "5").attr("markerUnits", "strokeWidth").attr("markerWidth", "9").attr("markerHeight", "5").attr("orient", "auto").append("svg:path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("fill", "#BBBBBB");
        force = d3.layout.force().charge(-120).linkDistance(30).nodes(json.nodes).links(json.links).size([w, h]).start();
        link = vis.selectAll("line.link").data(json.links).enter().append("svg:line").attr("class", "link").style("stroke-width", function (d) {
          return Math.sqrt(d.value);
        }).attr("x1", function (d) {
          return d.source.x;
        }).attr("y1", function (d) {
          return d.source.y;
        }).attr("x2", function (d) {
          return d.target.x;
        }).attr("y2", function (d) {
          return d.target.y;
        }).attr("marker-end", "url(#arrowhead)");
        node = vis.selectAll("circle.node").data(json.nodes).enter().append("svg:circle").attr("class", "node").attr("cx", function (d) {
          return d.x;
        }).attr("cy", function (d) {
          return d.y;
        }).attr("r", 5).style("fill", function (d) {
          return fill(d.group);
        }).on("dblclick", function (d) {
          return wiki.doInternalLink(d.name, div.parents('.page'));
        }).call(force.drag);
        node.append("svg:title").text(function (d, i) {
          return d.name;
        });
        vis.style("opacity", 1e-6).transition().duration(1000).style("opacity", 1);
        return force.on("tick", function () {
          link.attr("x1", function (d) {
            return d.source.x;
          }).attr("y1", function (d) {
            return d.source.y;
          }).attr("x2", function (d) {
            return d.target.x;
          }).attr("y2", function (d) {
            return d.target.y;
          });
          return node.attr("cx", function (d) {
            return d.x;
          }).attr("cy", function (d) {
            return d.y;
          });
        });
      });
    }
  };
}).call(void 0);
//# sourceMappingURL=force.js.map
